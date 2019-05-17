import { GameCore }  from './core.js';
import { BotPlayer } from './bot.js';
import { events}     from './events.js';
import { gameConsts } from '../../modules/constants.js';
import { shuffle }    from '../../modules/utils.js';
import idb from '../../modules/indexdb.js';
import bus from '../../modules/bus.js';

export class SinglePlayer extends GameCore {
    constructor() {
        super();
        this.availableCells = [];
        this.selectedCell = null;
        this.packsSelection = true;
        this.packs = [];
        this.currentPlayer = 'me';
        this.currentQuestion = null;

        bus.on(events.FILL_PACK_LIST,      this.onFillPacksList);
        bus.on(events.SET_CURRENT_PLAYER,  this.setCurrentPlayer);
        bus.on(events.ANSWERED_CELL,       this.setAnsweredCell);
        bus.on(events.GET_AVAILABLE_CELLS, this.getAvailableCells);
        bus.on(events.ENDED_TIME_TO_QUESTION, this.changePlayerTurn);
        bus.on(events.ENDED_TIME_TO_PACK,  this.changePlayerTurn);
        bus.on(events.STOP_TIMEOUT_PACK,   this.changePlayerTurn);
        bus.on(events.ENDED_TIME_TO_ANSWER, this.onEndAnswerTimer);
        bus.on(events.ENDED_PACK_SELECTION, this.onEndPackSelection);
    }

    start() {
        super.start();
        bus.emit(events.SET_OPPONENT_PROFILE, {
            avatarPath: '/assets/img/bot.png',
            nickname: 'Fool bot',
            lastMove: null
        });

        this.bot = new BotPlayer();
        bus.emit(events.SET_CURRENT_PLAYER, 'me');
        idb.getAll('pack', null, null, 10);
    }

    gameLoop() {
        bus.emit(events.SET_CURRENT_PLAYER, 'me');
        if (!this.packsSelection) {
            setTimeout(() =>
                bus.emit(events.GET_AVAILABLE_CELLS, 'me'), 1000
            );
        }
    }

    waitOpponent() {
        bus.emit(events.SET_CURRENT_PLAYER, 'bot');
        if (this.selectedPacks < 4) {
            bus.emit(events.BOT_CHOOSING_PACK,
                this.packs
                    .filter(p => p.type === 'pack' && p.state !== 'deactive')
                    .map(p => p.index)
            );
        }
    }

    setCurrentPlayer = (pl) => this.currentPlayer = pl;

    onEndPackSelection = () => {
        this.packsSelection = false;
        bus.off(events.ENDED_TIME_TO_PACK,  this.changePlayerTurn);
        bus.off(events.STOP_TIMEOUT_PACK,   this.changePlayerTurn);
        bus.off(events.ENDED_PACK_SELECTION, this.onEndPackSelection);
    };

    setAnsweredCell = (answer) => {
        this.gameMatrix[this.selectedCell].answered = true;
        const cond = this.currentPlayer === 'me';
        if (answer) {
            this[cond ? 'me': 'opponent'].lastMove = this.selectedCell;
        } else {
            // is any other available cell or not
            this.availableCells.shift();
            if (!this.availableCells.length) {
                bus.emit(events.END_GAME, !cond);
                return;
            }
        }

        this.changePlayerTurn();
    };

    changePlayerTurn = () => {
        this.currentPlayer === 'me' ? this.waitOpponent(): this.gameLoop();
    };

    onEndAnswerTimer = () => {
        this.currentPlayer === 'me' ? bus.emit(events.SELECTED_ANSWER, -1) : null;
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
                el >= gameConsts.FIRST_INDEX &&
                el !== lastMove &&
                el <= gameConsts.LAST_INDEX &&
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

        bus.emit(`success:${events.GET_AVAILABLE_CELLS}`, this.availableCells);
    };

    onGetCells(data) {
        const questions = data.reduce((ac, d) => {
                ac.push(...d);
                return ac;
            }, [])
            .map(d => d.packId);
        shuffle(questions);
        super.onGetCells(questions);

        this.packs.forEach((pack, pI) => {
            this.gameMatrix
                .filter(gm => gm.id === pack.id)
                .forEach((cell, i) =>
                    cell['question'] = data[pI][i]
                );
        });

        bus.emit(events.FILL_CELLS, this.gameMatrix);
        this.gameLoop();
    }

    onFillPacksList = (packs) => {
        this.packs = packs;
        const questions = [];

        this.packs.forEach((pack, i) => {
            idb.getAll('question', 'packId', pack.id, 10);
            const getQuestions = (data) => {
                questions.push(data);
                if (i === this.packs.length - 1) {
                    bus.emit(`success:${events.GET_CELLS}`, questions);
                    bus.off(`success:${events.GET_QUESTIONS_PACK}-${pack.id}-10`, getQuestions);
                }
            };

            bus.on(`success:${events.GET_QUESTIONS_PACK}-${pack.id}-10`, getQuestions);
        });
    };

    onSelectedCell = (cellIndex) => {
        if (cellIndex === -1) return;

        this.selectedCell = cellIndex;
        this.currentQuestion = this.gameMatrix[cellIndex].question;
        if (this.currentQuestion) {
            bus.emit(events.SELECTED_QUESTION, this.currentQuestion);
        } else {
            bus.emit(events.END_GAME, this.currentPlayer === 'me');
        }
    };

    onSelectedAnswer = (id) => {
        const answer = {
            given: id,
            correct: this.currentQuestion.correct
        };

        bus.emit(events.SET_ANSWER_CORRECTNESS, answer);
    };

    onPlayAgain = (data) => {
        bus.emit(events.FINISH_GAME);
        data ? bus.emit(events.GO_TO_PAGE, '/') : bus.emit(events.GO_TO_PAGE, '/singleplayer');
    };

    onGameFinished = () => {
        this.destroy();
    };

    destroy() {
        super.destroy();
        this.bot.destroy();

        bus.off(events.FILL_PACK_LIST,      this.onFillPacksList);
        bus.off(events.SET_CURRENT_PLAYER,  this.setCurrentPlayer);
        bus.off(events.ANSWERED_CELL,       this.setAnsweredCell);
        bus.off(events.GET_AVAILABLE_CELLS, this.getAvailableCells);
        bus.off(events.ENDED_TIME_TO_QUESTION, this.changePlayerTurn);
        bus.off(events.ENDED_TIME_TO_ANSWER, this.onEndAnswerTimer);
        bus.off(events.ENDED_PACK_SELECTION, this.onEndPackSelection);
    }
}
