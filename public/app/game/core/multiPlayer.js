import { GameCore } from './core.js';
import { events } from './events.js';
import { outMessages } from '../../modules/constants.js';
import bus from '../../modules/bus.js';

export class MultiPlayer extends GameCore {
    constructor() {
        super();
        this.onGetCells = this.onGetCells.bind(this);
        bus.on(events.SET_ANSWERED_CELL, this.setAnsweredCell);
        bus.on(events.PLAY_AGAIN_OR_NOT, this.onPlayAgain);
        bus.on(`success:${events.WS_CONNECT}`, this.notifyReady);
        bus.on(`success:${events.GET_CELLS}`, this.onGetCells);
    }

    start() {
        super.start();
        bus.emit(events.START_GAME);
        bus.emit(events.WS_CONNECT);
    }

    setAnsweredCell = ({ id, answer }) => {
    };

    notifyReady = () => {
        bus.emit('game:send-message',
            {
                title: outMessages.READY,
                payload: ''
            });
    };

    onGameStarted = () => {
    };

    onSelectedCell = (cellIndex) => {
        const y = Math.floor(cellIndex / this.cellCount);
        const x = cellIndex - (y * this.cellCount);
        bus.emit('game:send-message', { title: outMessages.GO_TO, payload: {x, y} });
    };

    onGetCells(data) {
        super.onGetCells(data);
        bus.emit(events.FILL_CELLS, this.gameMatrix);
    }

    onSelectedAnswer = (id) => {
        bus.emit('game:send-message', {
            title: outMessages.ANSWER,
            payload: {
                answer_id: id
            }
        });
    };

    onPlayAgain = (data) => {
        const message = data ? outMessages.QUIT : outMessages.CONTINUE;
        bus.emit('game:send-message', {
            title: message,
            payload: ''
        });

        bus.emit(events.FINISH_GAME);
        data ? bus.emit(events.GO_TO_PAGE, '/') : bus.emit(events.GO_TO_PAGE, '/multiplayer');
    };

    onGameFinished = () => {
        this.destroy();
    };

    destroy() {
        super.destroy();
        bus.off(events.SET_ANSWERED_CELL, this.setAnsweredCell);
        bus.off(events.PLAY_AGAIN_OR_NOT, this.onPlayAgain);
        bus.off(`success:${events.WS_CONNECT}`, this.notifyReady);
        bus.off(`success:${events.GET_CELLS}`,  this.onGetCells);
    }
}
