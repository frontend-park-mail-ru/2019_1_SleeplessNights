import { events} from './events.js';
import { GameCore } from './core.js';
import { BotPlayer } from './bot.js';

export class SinglePlayer extends GameCore {
    constructor() {
        super();
        this.questions = [];
        this.GAME_MATRIX = [];
        this.packs = [];
        this.currentPlayer = null;

        bus.on('set-current-player', this.setCurrentPlayer);
        bus.on('set-answered-cell', this.setAnsweredCell);
        bus.on('get-available-cells', this.getAvailableCells);
    }

    start() {
        super.start();
        bus.emit(events.START_GAME);
        this.opponent = {
            avatar_path: 'assets/img/bot.png',
            nickname: 'Fool bot',
            lastMove: null
        };

        this.bot = new BotPlayer();
    }

    gameLoop() {
        bus.emit('set-current-player', 'me');
        bus.emit('get-available-cells');
        bus.emit('selected-prize');
    };

    waitOpponent() {
        bus.emit('set-current-player', 'bot');
    }

    setCurrentPlayer = (pl) => this.currentPlayer = pl;

    setAnsweredCell = ({id, answer}) => {
        this.GAME_MATRIX[id].answered = true;
        const cond = this.currentPlayer === 'me';
        if (answer) {
            this[cond ? 'me': 'opponent'].lastMove = id;
        }
        cond ? this.waitOpponent(): this.gameLoop();
    };

    getAvailableCells = () => {
        let availables = [];
        const cond = this.currentPlayer === 'me';
        const lastMove = this[cond ? 'me': 'opponent'].lastMove;

        if (lastMove !== null) {
            let temp = [];
            let i = lastMove - this.CELL_COUNT;

            for (let j = 0; j < 3; i += this.CELL_COUNT, j++) {
                const currentRow = Math.floor(i / this.CELL_COUNT);
                [i - 1, i + 1].forEach(el =>
                    (Math.floor(el / this.CELL_COUNT ) === currentRow) ? temp.push(el): null
                );

                temp.push(i);
            }

            availables = temp.filter(el =>
                el >= 0 &&
                el !== lastMove &&
                el <= 63 &&
                !this.GAME_MATRIX[el].answered
            );
        } else {
            availables = this.GAME_MATRIX
                .reduce((accum, cell, i) => {
                    const cond = (
                        this.currentPlayer === 'me'
                            ? i >= this.CELL_COUNT * (this.CELL_COUNT - 1)
                            : i < this.CELL_COUNT
                    );

                    if (cond && !cell.answered) {
                        accum.push(i);
                    }
                    return accum;
                }, []);
        }

        bus.emit('success:get-available-cells', availables);
    };

    onGameStarted = (evt) => {
        idb.getAll('pack', null, null, 6);
    };

    onGameFinished = (evt) => {
        bus.emit('CLOSE_GAME');
    };

    onGetPacks = (data) => {
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
    };

    onFillPacksList = (packs) => {
        this.packs = packs;
        const questions = [];

        this.packs.forEach((pack, i) => {
            idb.getAll('question', 'packId', pack.id, 10);
            const getQuestions = (data) => {
                questions.push(...data);
                if (i === this.packs.length - 1) {
                    this.onQuestionsReady(questions);
                }
            };

            bus.on(`success:get-question-packId-${pack.id}`, getQuestions);
            bus.off(`success:get-question-packId-${pack.id}`, getQuestions);
        });
    };

    onQuestionsReady = (questions) => {
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
    };

    onSelectedCell = (cellIndex) => {
        const question = this.questions[cellIndex];
        if (question) {
            bus.emit('selected-question', question);
        } else {
            bus.emit('selected-prize');
        }
    };

    destroy() {
        super.destroy();
        this.bot.destroy();

        bus.off('set-current-player', this.setCurrentPlayer);
        bus.off('set-answered-cell', this.setAnsweredCell);
        bus.off('get-available-cells', this.getAvailableCells);

        this.questions = null;
        this.GAME_MATRIX = null;
        this.packs = null;
        this.currentPlayer = null;
    }
}
