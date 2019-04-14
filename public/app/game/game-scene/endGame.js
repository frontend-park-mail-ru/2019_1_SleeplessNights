import { AnswerComponent } from '../../components/answer/answer.js';
import { ModalComponent }  from '../../components/modal/modal.js';
import { QuestionComponent } from '../../components/question/question.js';

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
        bus.on('selected-answer-end-game', this.selectAnswer);
        bus.on('set-current-player', (pl) => this.currentPlayer = pl);
    }

    showModalEndGame = () => {
        if (this.modal) return;
        const text = `
            ${ this.currentPlayer === 'me' ? `Поздравляем вы победили !!!`
                : `Ваш соперник выиграл.`
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
            if ('index' in target.dataset) {
                anBlock.removeEventListener('click', answerChoosing);
                bus.emit('selected-answer-end-game', +target.dataset.index);
            }
        };

        anBlock.addEventListener('click', answerChoosing);
    };

    selectAnswer = (id) => {
        // if (id === 0) {
            console.log(this.buttons[id]);
        // }
    };
}
