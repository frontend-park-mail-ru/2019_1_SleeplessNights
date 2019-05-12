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
        this.currentPlayer = null;

        bus.on(events.END_GAME,           this.showModalEndGame);
        bus.on(events.SET_CURRENT_PLAYER, this.setCurrentPlayer);
    }

    setCurrentPlayer = (pl) => this.currentPlayer = pl;

    showModalEndGame = (lost) => {
        if (this.modal) return;
        const text = `
            ${ this.currentPlayer === 'me' && !lost ? 'Поздравляем вы победили !!!'
            : 'Вы проиграли.'
            }`;
        const questionText = new QuestionComponent({
            customClasses: 'question_big',
            text
        });

        const answerSection = document.createElement('div');
        answerSection.className = 'answer-block';

        this.buttons.forEach((answer, id) => {
            const button = new AnswerComponent({
                answerId: id,
                text: answer
            });

            answerSection.insertAdjacentHTML('beforeend', button.template);
        });

        this.modal = new ModalComponent({
            customClasses: 'modal_w-400',
            isCloseable: true,
            body: `${questionText.template} ${answerSection.outerHTML}`
        });

        this.root.insertAdjacentHTML('beforeend', this.modal.template);
        this.modal.show();

        const anBlock = document.getElementsByClassName('answer-block')[0];
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
        bus.off(events.END_GAME,           this.showModalEndGame);
        bus.off(events.SET_CURRENT_PLAYER, this.setCurrentPlayer);
    }
}
