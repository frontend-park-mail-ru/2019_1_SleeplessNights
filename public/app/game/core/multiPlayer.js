import { GameCore } from './core.js';
import { events } from './events.js';
import { noop }   from '../../modules/utils.js';
import { outMessages } from '../../modules/constants.js';
import bus from '../../modules/bus.js';

export class MultiPlayer extends GameCore {
    constructor() {
        super();
        bus.on(events.ENDED_TIME_TO_QUESTION, noop);
        bus.on(events.ENDED_TIME_TO_PACK,     noop);
        bus.on(`success:${events.WS_CONNECT}`, this.notifyReadiness);
    }

    start() {
        super.start();
        bus.emit(user.isAuthorised ? events.WS_CONNECT : events.NOT_AUTHORISED);
    }

    notifyReadiness = () => {
        bus.emit('game:send-message',
            {
                title: outMessages.READY,
                payload: ''
            });
    };

    onSelectedPack(id) {
        bus.emit(events.STOP_TIMEOUT_PACK, 'multiPlayer');
        if (id === -1) return;
        this.packs[id].state = 'deactive';

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
        bus.emit(events.STOP_TIMEOUT_QUESTION);
        if (cellIndex === -1) return;

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
        if (this.currentPlayer === 'me') {
            bus.emit('game:send-message', {
                title: outMessages.ANSWER,
                payload: {
                    answer_id: id
                }
            });
        }
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
        bus.off(events.ENDED_TIME_TO_QUESTION, noop);
        bus.off(events.ENDED_TIME_TO_PACK,     noop);
        bus.off(`success:${events.WS_CONNECT}`, this.notifyReadiness);
    }
}
