import { GameCore } from './core.js';
import { events } from './events.js';
import { outMessages } from '../../modules/constants.js';
import bus from '../../modules/bus.js';

export class MultiPlayer extends GameCore {
    constructor() {
        super();
        bus.emit('start-game-multiplayer');
    }

    start() {
        super.start();
        bus.emit(events.START_GAME);
        bus.on(events.SET_ANSWERED_CELL, this.setAnsweredCell);
    }

    setAnsweredCell = ({ id, answer }) => {
    };

    onGameStarted = () => {
        bus.on('success:start-game-multiplayer', () =>
            bus.emit('game:send-message', ({ title: outMessages.READY, payload: '' }))
        );

        bus.on('success:get-cells', this.onGetCells);
    };

    onSelectedCell = (cellIndex) => {
        const y = Math.floor(cellIndex / this.cellCount);
        const x = cellIndex - (y * this.cellCount);
        bus.emit('game:send-message', ({ title: outMessages.GO_TO, payload: {x, y} }));
    };

    onGetCells(data) {
        super.onGetCells(data);
        bus.emit(events.FILL_CELLS, this.gameMatrix);
    }

    onSelectedAnswer = (id) => {
        bus.emit('game:send-message', ({
            title: outMessages.ANSWER,
            payload: {
                answer_id: id
            }
        }));
    };

    onGameFinished = () => {
        this.destroy();
    };

    destroy() {
        super.destroy();
    }
}
