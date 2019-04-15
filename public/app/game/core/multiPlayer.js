import { GameCore } from './core.js';
import { IWebSocket } from '../../modules/websocket.js';

export class MultiPlayer extends GameCore {
    constructor() {
        super();
        this.ws = new IWebSocket();
    }

    start() {
        super.start();
        this.ws.sendMessage('start-game', null);
    }

    onGameStarted = () => {
    };

    onGameFinished = () => {
    }
}
