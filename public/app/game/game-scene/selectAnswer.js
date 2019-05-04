import { AnswerComponent } from '../../components/answer/answer.js';
import { ModalComponent }  from '../../components/modal/modal.js';
import { QuestionComponent } from '../../components/question/question.js';
import { shuffle } from '../../modules/utils.js';

export class SelectAnswerScene {
    constructor(root) {
        this.root = root;
        this.answers = new Map();
        this.correctAnswer = null;
        this.modal = null;
        this.currentPlayer = null;

        bus.on('selected-question', this.onSelectedQuestion);
        bus.on('selected-answer', this.selectAnswer);
        bus.on('set-current-player', this.setCurrentPlayer);
    }

    setCurrentPlayer = (pl) => this.currentPlayer = pl;

    onSelectedQuestion = (question) => {
        const questionText = new QuestionComponent({
            text: question.text
        });

        this.correctAnswer = question.correct;
        const answerSection = document.createElement('div');
        answerSection.className = 'answer-block';

        question.answers.forEach((answer, id) => {
            this.answers.set(id, new AnswerComponent({
                    answerId: id,
                    text: answer
                })
            );
        });

        const _answers = [...this.answers.values()];
        shuffle(_answers);

        _answers.forEach(answer => {
            answerSection.insertAdjacentHTML('beforeend', answer.template)
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

        if (this.currentPlayer === 'me') {
            const anBlock = document.getElementsByClassName('answer-block')[0];
            const answerChoosing = (event) => {
                const target = event.target;
                if ('chat.js' in target.dataset) {
                    anBlock.removeEventListener('click', answerChoosing);
                    bus.emit('selected-answer', +target.dataset.index);
                }
            };

            anBlock.addEventListener('click', answerChoosing);
        }
    };

    selectAnswer = (id) => {
        let isTrue;
        if (id === this.correctAnswer) {
            this.answers.get(id).setCorrect();
            isTrue = true;
        } else {
            this.answers.get(id).setFailed();
            this.answers.get(this.correctAnswer).setCorrect();
            isTrue = false;
        }

        setTimeout(() => {
            this.modal.hide();
            bus.emit('answered-cell', isTrue);
        }, 1300);
    };

    destroy() {
        bus.off('selected-question', this.onSelectedQuestion);
        bus.off('selected-answer', this.selectAnswer);
        bus.off('set-current-player', this.setCurrentPlayer);
    }
}
