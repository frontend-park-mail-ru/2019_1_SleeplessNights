import { events} from './events.js';
import { GameCore } from './core.js';

export class SinglePlayer extends GameCore {
    constructor() {
        super();
        this.questions = [];
        this.GAME_MATRIX = [];
        this.packs = [];
        this.currentPlayer = null;

        bus.on('set-current-player', (pl) => this.currentPlayer = pl);
        bus.on('set-answered-cell', (id) => {
            this.GAME_MATRIX[id].answered = true;
            if (this.currentPlayer === 'me') {
                this.waitOpponent();
            } else {
                this.gameLoop();
            }
        });
    }

    start() {
        super.start();
        bus.emit(events.START_GAME);
        this.opponent = {
            avatar_path: 'assets/img/bot.png',
            nickname: 'Fool bot',
            lastMove: null
        };
    }

    gameLoop() {
        bus.emit('set-current-player', 'me');
        this.getAvailableCells();
    };

    waitOpponent() {
        bus.emit('set-current-player', 'bot');

        const rndTime = Math.floor(Math.random() * (5 - 3 + 1)) + 3;

        const botChoosingQuestion = (question) => {
            const answers = question.answers;
            const rndAnswer = Math.floor(Math.random() * answers.length);
            setTimeout(() => {
                bus.emit('selected-answer', rndAnswer);
                bus.off('success:get-available-cells', botChoosingCell);
                bus.off('selected-question', botChoosingQuestion);
            }, rndTime * 1000);
        };

        const botChoosingCell = (availableCells) => {
            setTimeout(() => {
                const rndCell = availableCells[Math.floor(Math.random() * availableCells.length)];
                bus.on('selected-question', botChoosingQuestion);
                bus.emit('selected-cell', rndCell);
            }, rndTime * 1000);
        };

        bus.on('success:get-available-cells', botChoosingCell);

        this.getAvailableCells();
    }

    getAvailableCells = () => {
        let availables = [];
        if (this.currentPlayer === 'me') {
            availables = this.GAME_MATRIX
                .reduce((accum, cell, i) => {
                    if (i >= this.CELL_COUNT * (this.CELL_COUNT - 1) && !cell.answered) {
                        accum.push(i);
                    }
                    return accum;
                }, []);
        } else {
            availables = this.GAME_MATRIX
                .reduce((accum, cell, i) => {
                    if (i < this.CELL_COUNT && !cell.answered) {
                        accum.push(i);
                    }
                    return accum;
                }, []);
        }

        bus.emit('success:get-available-cells', availables);
    };

    onGameStarted(evt) {
        idb.getAll('pack', null, null, 6);
        bus.on('success:get-pack-id-', (data) => {
            const packs = data;

            packs.forEach((pack, i) =>
                Object.assign(pack, this.colors[i])
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
            this.gameLoop();
        });
    }

    onGameFinished(evt) {
        bus.emit('CLOSE_GAME');
    }

    onFillPacksList(packs) {
        this.packs = packs;
        const questions = [];

        this.packs.forEach((pack, i) => {
            idb.getAll('question', 'packId', pack.id, 10);
            bus.on(`success:get-question-packId-${pack.id}`, (data) => {
                questions.push(...data);

                if (i === this.packs.length - 1) {
                    this.onQuestionsReady(questions);
                }
            });
        });
    }

    onQuestionsReady(questions) {
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
    }

    onSelectedCell(cellIndex) {
        const question = this.questions[cellIndex];
        bus.emit('selected-question', question);
    }
}
