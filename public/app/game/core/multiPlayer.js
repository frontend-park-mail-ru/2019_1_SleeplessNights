import { GameCore } from './core.js';
import { events } from './events.js';
import { gameConsts, outMessages } from '../constants.js';
import bus from '../../modules/bus.js';

export class MultiPlayer extends GameCore {
    constructor() {
        super();
        this.packs = [];
        bus.emit('start-game-multiplayer');
    }

    start() {
        super.start();
        bus.emit(events.START_GAME);
    }

    setAnsweredCell = ({ id, answer }) => {
        // this.gameMatrix[id].answered = true;
        const cond = this.currentPlayer === 'me';
        // if (answer) {
        //     this[cond ? 'me': 'opponent'].lastMove = id;
        // } else {
        //     // is any other available cell or not
        //     this.availableCells.shift();
        //     if (!this.availableCells.length) {
        //         bus.emit('no-available-cells', true);
        //         return;
        //     }
        // }
        cond ? this.waitOpponent(): this.gameLoop();
    };

    onGameStarted = () => {
        bus.on('success:start-game-multiplayer', () => {
            bus.emit('game:send-message', ({ title: outMessages.READY, payload: '' }));
            // bus.emit('game:send-message', ({ title: 'THEMES_REQUEST', payload: '' }));
            // bus.emit('game:send-message', ({ title: 'QUESTION_THEMES_REQUEST', payload: '' }));
        });

        bus.on('success:get-cells', this.onGetCells);
    };

    onSelectedCell = (cellIndex) => {
        const y = cellIndex % this.cellCount;
        const x = cellIndex - (y * this.cellCount);
        bus.emit('game:send-message', ({ title: outMessages.GO_TO, payload: {x, y} }));
    };

    onGameFinished = () => {
        this.destroy();
    };

    onGetPacks = (data) => {
        this.packs = data;
        this.packs.forEach((pack, i) =>
            Object.assign(pack, this.colors[i])
        );

        bus.emit(events.FILL_PACK_LIST, this.packs);
    };
    
    onGetCells = (data) => {
        for (let i = 0; i < gameConsts.cellCount; i++) {
            for (let j = 0; j < gameConsts.cellCount; j++) {
                if (
                    (i === gameConsts.PRIZE_INDEXES[0].x && j === gameConsts.PRIZE_INDEXES[0].y) ||
                    (i === gameConsts.PRIZE_INDEXES[1].x && j === gameConsts.PRIZE_INDEXES[1].y) ||
                    (i === gameConsts.PRIZE_INDEXES[2].x && j === gameConsts.PRIZE_INDEXES[2].y) ||
                    (i === gameConsts.PRIZE_INDEXES[3].x && j === gameConsts.PRIZE_INDEXES[3].y)
                ) {
                    this.gameMatrix.push({
                        type: 'prize',
                        color: gameConsts.PRIZE_COLOR
                    });
                } else {
                    this.gameMatrix.push({
                        type: 'question'
                    });
                }
            }
        }

        let c = 0;
        const prizes = [];

        this.gameMatrix.forEach((cell, i) => {
            if (cell.type === 'question') {
                const pack = this.packs.findIndex(p => p.id === data[c]);
                c++;
                Object.assign(cell, this.packs[pack]);
            } else {
                prizes.push(i);
            }
        });

        bus.emit(events.FILL_CELLS, this.gameMatrix);
    };
}
