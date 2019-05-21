import { GameCore } from './core.js';
import { events } from './events.js';
import { outMessages } from '../../modules/constants.js';
import bus from '../../modules/bus.js';

export class MultiPlayer extends GameCore {
    constructor() {
        super();
        bus.on(events.PLAY_AGAIN_OR_NOT, this.onPlayAgain);
        bus.on(events.ENDED_TIME_TO_QUESTION, () => null);
        bus.on(`success:${events.WS_CONNECT}`, this.notifyReadiness);
    }

    start() {
        super.start();
        bus.emit(events.WS_CONNECT);
    }

    notifyReadiness = () => {
        bus.emit('game:send-message',
            {
                title: outMessages.READY,
                payload: ''
            });
    };

    onSelectedPack(id) {
        super.onSelectedPack(id);
        if (this.currentPlayer === 'me') {
            if (id >= 5) id -= 2;
            bus.emit('game:send-message',
                {
                    title: outMessages.NOT_DESIRED_PACK,
                    payload: {
                        pack_id: id
                    }
                });
        }

        if (++this.selectedPacks === 4) {
            bus.emit(events.ENDED_PACK_SELECTION);
        }
    };

    onSelectedCell = (cellIndex) => {
        if (this.currentPlayer === 'me') {
            const y = Math.floor(cellIndex / this.cellCount);
            const x = cellIndex - (y * this.cellCount);
            bus.emit('game:send-message', { title: outMessages.GO_TO, payload: {x, y} });
        }
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

    destroy() {
        super.destroy();
        bus.off(events.ENDED_TIME_TO_QUESTION, () => null);
        bus.off(`success:${events.WS_CONNECT}`, this.notifyReadiness);
    }
}
