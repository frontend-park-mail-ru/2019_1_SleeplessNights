import { GameCore } from './core.js';
import bus from '../../modules/bus.js';
import { events } from './events.js';

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

    gameLoop() {
        bus.emit('set-current-player', 'me');
    }

    waitOpponent() {
        bus.emit('set-current-player', 'bot');
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
            bus.emit('game:send-message', ({ title: 'READY', payload: '' }));
            // bus.emit('game:send-message', ({ title: 'THEMES_REQUEST', payload: '' }));
            // bus.emit('game:send-message', ({ title: 'QUESTION_THEMES_REQUEST', payload: '' }));
        });

        bus.on('success:get-cells', this.onGetCells);
    };

    onSelectedCell = (cellIndex) => {
        const y = cellIndex % this.cellCount;
        const x = cellIndex - (y * this.cellCount);
        bus.emit('game:send-message', ({ title: 'GO_TO', payload: {x, y} }));
    };

    onGameFinished = () => {
        this.destroy();
    };

    onGetPacks = (data) => {
        this.packs = data;
        this.packs.forEach((pack, i) => {
            pack.name = pack.theme;
            Object.assign(pack, this.colors[i])
        });

        bus.emit('fill-pack-list', this.packs);
    };
    
    onGetCells = (data) => {
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

        const packsCount = this.packs.length;
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

        bus.emit('fill-cells', this.gameMatrix);
        this.gameLoop();
    };

    onFillPacksList = (data) => {
        const questions = [];
    };
}
