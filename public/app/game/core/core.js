import { events} from './events.js';
import { ModalComponent } from '../../components/modal/modal.js';
import {QuestionComponent} from "../../components/question/question.js";
import {AnswerComponent} from "../../components/answer/answer.js";

export class GameCore {
    constructor(root) {
        this.root = root;
        this.packs = [];
        this.questions = [];
        this.CELL_COUNT = 8;
        this.GAME_MATRIX = [];
        this.onGameStarted = this.onGameStarted.bind(this);
        this.onGameFinished = this.onGameFinished.bind(this);

        bus.on('fill-pack-list', packs => {
            this.packs = packs;
            const questions = [];

            this.packs.forEach((pack, i) => {
                idb.getAll('question', 'packId', pack.id, 10);
                bus.on(`success:get-question-packId-${pack.id}`, (data) => {
                    questions.push(...data);

                    if (i === this.packs.length - 1) {
                        bus.emit('questions-ready', questions);
                    }
                });
            });
        });

        bus.on('questions-ready', (questions) => {
            let qI = 0;
            for (let i = 0; i < this.CELL_COUNT; i++) {
                for (let j = 0; j < this.CELL_COUNT; j++) {
                    if ((i === 3 && j === 3) || (i === 3 && j === 4) ||
                        (i === 4 && j === 3) || (i === 4 && j === 4)) {
                        this.questions.push(null);
                    } else {
                        this.questions.push(questions[qI++]);
                    }
                }
            }
        });
    }

    start() {
        bus.on(events.START_GAME, this.onGameStarted);
        bus.on(events.FINISH_GAME, this.onGameFinished);

        idb.getAll('pack', null, null, 6);
        bus.on('success:get-pack-id-', (data) => {
            const packs = data;
            const colors = [
                {
                    color: '#B3B156'
                },
                {
                    color: '#FFFD94'
                },
                {
                    color: '#ADE0FF'
                },
                {
                    color: '#FFB454'
                },
                {
                    color:'#00FFC5',
                },
                {
                    color: '#CC6264',
                }
            ];

            packs.forEach((pack, i) =>
                Object.assign(pack, colors[i])
            );

            bus.emit('fill-pack-list', packs);

            for (let i = 0; i < this.CELL_COUNT; i++) {
                for (let j = 0; j < this.CELL_COUNT; j++) {
                    if ((i === 3 && j === 3) || (i === 3 && j === 4) ||
                        (i === 4 && j === 3) || (i === 4 && j === 4)) {
                        this.GAME_MATRIX.push({
                            type: 'prize',
                            color: '#0c5460'
                        });
                    } else {
                        this.GAME_MATRIX.push({
                            type: 'question'
                        });
                    }
                }
            }

            const packsCount = packs.length;
            let p = 0;
            this.GAME_MATRIX.forEach(cell => {
                if (cell.type === 'question') {
                    Object.assign(cell, packs[p]);
                    p = (p + 1) % packsCount;
                }
            });

            bus.emit('fill-cells', this.GAME_MATRIX);

            this.onSelectPack();
        });
    }

    onGameStarted(evt) {
        throw new Error('This method must be overridden');
    }

    onGameFinished(evt) {
        throw new Error('This method must be overridden');
    }

    onSelectPack() {
        bus.on('selected-cell', (cellIndex) => {

            const question = this.questions[cellIndex];
            const questionText = new QuestionComponent({
                text: question.text
            });

            const answerSection = document.createElement('div');
            answerSection.className = 'answer-block';
            const answers = [];

            question.answers.forEach((answer, id) => {
                const answerText = new AnswerComponent({
                    answerId: id,
                    text: answer
                });

                answers.push(answerText);
                answerSection.insertAdjacentHTML('beforeend', answerText.template);
            });

            const modal = new ModalComponent({
                customClasses: 'modal_w-400',
                isCloseable: false,
                body: `
                    ${questionText.template}
                    ${answerSection.outerHTML}
                `
            });

            this.root.insertAdjacentHTML('beforeend', modal.template);
            modal.show();

            const anBlock = document.getElementsByClassName('answer-block')[0];
            const answerChoosing = (event) => {
                const target = event.target;
                if ('index' in target.dataset) {
                    const id = target.dataset.index;
                    let isTrue;

                    if (+id === question.correct) {
                        answers[id].setCorrect();
                        isTrue = true;
                    } else {
                        answers[id].setFailed();
                        answers[question.correct].setCorrect();
                        isTrue = false;
                    }

                    anBlock.removeEventListener('click', answerChoosing);
                    setTimeout(() => {
                        modal.hide();
                        bus.emit('answered-cell', isTrue);
                    }, 1300);
                }
            };

            anBlock.addEventListener('click', answerChoosing);
        });
    }

    destroy() {
        bus.off(events.START_GAME, this.onGameStarted);
        bus.off(events.FINISH_GAME, this.onGameFinished);
    }
}
