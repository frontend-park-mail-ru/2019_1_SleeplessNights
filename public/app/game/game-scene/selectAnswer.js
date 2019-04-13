import { ModalComponent }    from '../../components/modal/modal.js';
import { QuestionComponent } from '../../components/question/question.js';
import { AnswerComponent }   from '../../components/answer/answer.js';

export class SelectAnswerScene {
    constructor(root) {
        this.root = root;
        this.answers = [];
        this.correctAnswer = null;
        this.modal = null;

        this.onSelectedQuestion = this.onSelectedQuestion.bind(this);
        bus.on('selected-question', this.onSelectedQuestion);
    }

    onSelectedQuestion(question) {
        const questionText = new QuestionComponent({
            text: question.text
        });

        this.correctAnswer = question.correct;
        const answerSection = document.createElement('div');
        answerSection.className = 'answer-block';

        this.answers = [];
        question.answers.forEach((answer, id) => {
            const answerText = new AnswerComponent({
                answerId: id,
                text: answer
            });

            this.answers.push(answerText);
            answerSection.insertAdjacentHTML('beforeend', answerText.template);
        });

        this.modal = new ModalComponent({
            customClasses: 'modal_w-400',
            isCloseable: false,
            body: `
                    ${questionText.template}
                    ${answerSection.outerHTML}
                `
        });

        this.root.insertAdjacentHTML('beforeend', this.modal.template);
        this.modal.show();

        const anBlock = document.getElementsByClassName('answer-block')[0];
        const answerChoosing = (event) => {
            const target = event.target;
            if ('index' in target.dataset) {
                anBlock.removeEventListener('click', answerChoosing);
                this.selectAnswer(target.dataset.index);
            }
        };

        anBlock.addEventListener('click', answerChoosing);
    }

    selectAnswer(id) {
        let isTrue;
        if (id === this.correctAnswer) {
            this.answers[id].setCorrect();
            isTrue = true;
        } else {
            this.answers[id].setFailed();
            this.answers[this.correctAnswer].setCorrect();
            isTrue = false;
        }

        setTimeout(() => {
            this.modal.hide();
            bus.emit('answered-cell', isTrue);
        }, 1300);
    }
}
