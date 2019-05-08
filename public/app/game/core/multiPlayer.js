import { GameCore } from './core.js';
import bus from '../../modules/bus.js';
import { events } from './events.js';

export class MultiPlayer extends GameCore {
    constructor() {
        super();
        bus.emit('start-game-multiplayer');
    }

    start() {
        super.start();
        bus.emit(events.START_GAME);
    }

    onGameStarted = () => {
        bus.on('success:start-game-multiplayer', () =>
            bus.emit('game:send-message', ({ title: 'READY', payload: '' }))
        );
    };

    onGameFinished = () => {
        this.destroy();
    };

    onGetPacks = (data) => {
        console.log(data);
    };

    onFillPacksList = (packs) => {
        console.log(packs);
    };
}
