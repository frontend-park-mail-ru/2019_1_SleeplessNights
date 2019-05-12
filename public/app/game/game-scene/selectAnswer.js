import { AnswerComponent } from '../../components/answer/answer.js';
import { ModalComponent }  from '../../components/modal/modal.js';
import { QuestionComponent } from '../../components/question/question.js';
import { shuffle } from '../../modules/utils.js';
import { events }  from '../core/events.js';
import bus from '../../modules/bus.js';

export class SelectAnswerScene {
    constructor(root) {
        this.root = root;
        this.answers = new Map();
        this.modal = null;
        this.currentPlayer = null;

        bus.on(events.SELECTED_QUESTION,      this.onSelectedQuestion);
        bus.on(events.SET_CURRENT_PLAYER,     this.setCurrentPlayer);
        bus.on(events.SET_ANSWER_CORRECTNESS, this.setAnswer);
    }

    setCurrentPlayer = (pl) => this.currentPlayer = pl;

    onSelectedQuestion = (question) => {
        const questionText = new QuestionComponent({
            text: question.text
        });
        
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
            body: `${questionText.template} ${answerSection.outerHTML}`
        });

        this.root.insertAdjacentHTML('beforeend', this.modal.template);
        this.modal.show();

        if (this.currentPlayer === 'me') {
            const anBlock = document.getElementsByClassName('answer-block')[0];
            const answerChoosing = (event) => {
                const target = event.target;
                if ('index' in target.dataset) {
                    anBlock.removeEventListener('click', answerChoosing);
                    bus.emit(events.SELECTED_ANSWER, +target.dataset.index);
                }
            };

            anBlock.addEventListener('click', answerChoosing);
        }
    };

    setAnswer = ({ given, correct }) => {
        let isTrue;
        if (given === correct) {
            this.answers.get(given).setCorrect();
            isTrue = true;
        } else {
            this.answers.get(given).setFailed();
            this.answers.get(correct).setCorrect();
            isTrue = false;
        }

        setTimeout(() => {
            this.modal.hide();
            bus.emit(events.ANSWERED_CELL, isTrue);
        }, 1300);
    };

    destroy() {
        bus.off(events.SELECTED_QUESTION,      this.onSelectedQuestion);
        bus.off(events.SET_CURRENT_PLAYER,     this.setCurrentPlayer);
        bus.off(events.SET_ANSWER_CORRECTNESS, this.setAnswer);
    }
}
