import { events} from './events.js';
import { GameCore } from './core.js';
import { BotPlayer } from './bot.js';
import { shuffle } from '../../modules/utils.js';
import idb from '../../modules/indexdb.js';
import bus from '../../modules/bus.js';

export class SinglePlayer extends GameCore {
    constructor() {
        super();
        this.availableCells = [];
        this.gameMatrix = [];
        this.packs = [];
        this.currentPlayer = 'me';

        bus.on('set-current-player',  this.setCurrentPlayer);
        bus.on('set-answered-cell',   this.setAnsweredCell);
        bus.on('get-available-cells', this.getAvailableCells);
    }

    start() {
        super.start();
        bus.emit(events.START_GAME);
        bus.emit('set-opponent-profile', {
            avatarPath: '/assets/img/bot.png',
            nickname: 'Fool bot',
            lastMove: null
        });

        this.bot = new BotPlayer();
    }

    gameLoop() {
        bus.emit('set-current-player', 'me');
        setTimeout(() =>
            bus.emit('get-available-cells'), 1000
        );
    }

    waitOpponent() {
        bus.emit('set-current-player', 'bot');
    }

    setCurrentPlayer = (pl) => this.currentPlayer = pl;

    setAnsweredCell = ({ id, answer }) => {
        this.gameMatrix[id].answered = true;
        const cond = this.currentPlayer === 'me';
        if (answer) {
            this[cond ? 'me': 'opponent'].lastMove = id;
        } else {
            // is any other available cell or not
            this.availableCells.shift();
            if (!this.availableCells.length) {
                bus.emit('no-available-cells', true);
                return;
            }
        }
        cond ? this.waitOpponent(): this.gameLoop();
    };

    getAvailableCells = () => {
        this.availableCells = [];
        const cond = this.currentPlayer === 'me';
        const lastMove = this[cond ? 'me': 'opponent'].lastMove;

        if (lastMove !== null) {
            let temp = [];
            let i = lastMove - this.cellCount;

            for (let j = 0; j < 3; i += this.cellCount, j++) {
                const currentRow = Math.floor(i / this.cellCount);
                [i - 1, i + 1].forEach(el =>
                    (Math.floor(el / this.cellCount ) === currentRow) ? temp.push(el): null
                );

                temp.push(i);
            }

            this.availableCells = temp.filter(el =>
                el >= 0 &&
                el !== lastMove &&
                el <= 63 &&
                !this.gameMatrix[el].answered
            );
        } else {
            this.availableCells = this.gameMatrix
                .reduce((accum, cell, i) => {
                    const cond = (
                        this.currentPlayer === 'me'
                            ? i >= this.cellCount * (this.cellCount - 1)
                            : i < this.cellCount
                    );

                    if (cond && !cell.answered) {
                        accum.push(i);
                    }
                    return accum;
                }, []);
        }

        bus.emit('success:get-available-cells', this.availableCells);
    };

    onGameStarted = () => {
        idb.getAll('pack', null, null, 6);
    };

    onGameFinished = () => {
        this.destroy();
    };

    onGetPacks = (data) => {
        const packs = data;
        packs.forEach((pack, i) =>
            Object.assign(pack, this.colors[i])
        );

        bus.emit('fill-pack-list', packs);

        for (let i = 0; i < this.cellCount; i++) {
            for (let j = 0; j < this.cellCount; j++) {
                if ((i === 3 && j === 3) || (i === 3 && j === 4) ||
                    (i === 4 && j === 3) || (i === 4 && j === 4)) {
                    this.gameMatrix.push({
                        type: 'prize',
                        color: '#0c5460'
                    });
                } else {
                    this.gameMatrix.push({
                        type: 'question'
                    });
                }
            }
        }

        const packsCount = packs.length;
        let p = 0;
        const prizes = [];

        this.gameMatrix.forEach((cell, i) => {
            if (cell.type === 'question') {
                Object.assign(cell, packs[p]);
                p = (p + 1) % packsCount;
            } else {
                prizes.push(i);
            }
        });

        shuffle(this.gameMatrix, prizes);

        bus.emit('fill-cells', this.gameMatrix);
        this.gameLoop();
    };

    onFillPacksList = (packs) => {
        this.packs = packs;
        const questions = [];

        this.packs.forEach((pack, i) => {
            idb.getAll('question', 'packId', pack.id, 10);
            const getQuestions = (data) => {
                questions.push(data);
                if (i === this.packs.length - 1) {
                    this.onQuestionsReady(questions);
                    bus.off(`success:get-question-packId-${pack.id}`, getQuestions);
                }
            };

            bus.on(`success:get-question-packId-${pack.id}`, getQuestions);
        });
    };

    onQuestionsReady = (questions) => {
        this.packs.forEach((pack, pI) => {
            const packInMatrix = this.gameMatrix.filter(gm => gm.id === pack.id);
            packInMatrix.forEach((cell, i) =>
                cell['question'] = questions[pI][i]
            );
        });
    };

    onSelectedCell = (cellIndex) => {
        const question = this.gameMatrix[cellIndex].question;
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
    }
}
