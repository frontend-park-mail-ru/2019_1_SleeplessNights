import { AnswerComponent } from '../../components/answer/answer.js';
import { ModalComponent }  from '../../components/modal/modal.js';
import { QuestionComponent } from '../../components/question/question.js';
import { events } from '../core/events.js';
import bus from '../../modules/bus.js';

export class EndGameScene {
    constructor(root) {
        this.root = root;
        this.answers = [];
        this.buttons = [
            'Играть заново',
            'В главное меню'
        ];
        this.modal = null;
        bus.on(events.END_GAME, this.showModalEndGame);
    }

    showModalEndGame = (win) => {
        if (this.modal) return;
        const text = `
            ${win ? 'Поздравляем вы победили !!!'
            : 'Вы проиграли.'
            }`;
        const questionText = new QuestionComponent({
            customClasses: 'question_big',
            text
        });

        const answerSection = document.createElement('div');
        answerSection.className = 'answer-block';
        answerSection.id = 'answer-block-end-game';

        this.buttons.forEach((answer, id) => {
            const button = new AnswerComponent({
                customClasses: 'container_theme-primary2',
                answerId: id,
                text: answer
            });

            answerSection.insertAdjacentHTML('beforeend', button.template);
        });

        this.modal = new ModalComponent({
            customClasses: 'w60-vw container_skewed justify-content-center align-items-center container_theme-primary1',
            isCloseable: false,
            body: `${questionText.template} ${answerSection.outerHTML}`
        });

        this.root.insertAdjacentHTML('beforeend', this.modal.template);
        this.modal.show();

        const anBlock = document.getElementById('answer-block-end-game');
        const answerChoosing = (event) => {
            const target = event.target;
            event.stopPropagation();
            if ('index' in target.dataset) {
                anBlock.removeEventListener('click', answerChoosing);
                bus.emit(events.PLAY_AGAIN_OR_NOT, +target.dataset.index);
            }
        };

        anBlock.addEventListener('click', answerChoosing);
    };

    destroy() {
        bus.off(events.END_GAME, this.showModalEndGame);
    }
}
