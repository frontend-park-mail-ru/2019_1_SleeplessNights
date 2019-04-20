import { AnswerComponent } from '../../components/answer/answer.js';
import { ModalComponent }  from '../../components/modal/modal.js';
import { QuestionComponent } from '../../components/question/question.js';
import { events } from '../core/events.js';

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

        bus.on('selected-prize', this.showModalEndGame);
        bus.on('no-available-cells', this.showModalEndGame);
        bus.on('selected-answer-end-game', this.selectAnswer);
        bus.on('set-current-player', this.setCurrentPlayer);
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
            event.stopPropagation();
            if ('index' in target.dataset) {
                anBlock.removeEventListener('click', answerChoosing);
                bus.emit('selected-answer-end-game', +target.dataset.index);
            }
        };

        anBlock.addEventListener('click', answerChoosing);
    };

    selectAnswer = (id) => {
        bus.emit(events.FINISH_GAME, id);
    };

    destroy() {
        bus.off('selected-prize', this.showModalEndGame);
        bus.off('no-available-cells', this.showModalEndGame);
        bus.off('selected-answer-end-game', this.selectAnswer);
        bus.off('set-current-player', this.setCurrentPlayer);
    }
}
