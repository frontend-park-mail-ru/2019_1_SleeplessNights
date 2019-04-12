import { GameCore } from './core.js';

export class SinglePlayer extends GameCore {
    constructor(root) {
        super(root);
    }

    start() {
        super.start();
    }

    gameLoop() {

    }

    onGameStarted(evt) {

    }

    onGameFinished(evt) {
        bus.emit('CLOSE_GAME');
    }
}
