import { modes } from './modes.js';
import { SinglePlayer } from './core/singlePlayer.js';
import { MultiPlayer }  from './core/multiPlayer.js';
import { GameController } from './controller.js';
import { PlayingScene }   from './game-scene/playing.js';
import { events } from './core/events.js';
import bus from '../modules/bus.js';

export class Game {
    constructor ({
        root,
        mode = ''
    } = {}) {
        this.root = root;
        this.GameConstructor = null;

        switch (mode) {
        case modes.SINGLE_PLAYER:
            this.GameConstructor = SinglePlayer;
            break;
        case modes.MULTI_PLAYER:
            this.GameConstructor = MultiPlayer;
            break;
        default:
            throw new Error(`Invalid game mode ${mode}`);
        }

        this.gameScene = null;
        this.gameCore = null;
        this.gameContoller = new GameController();

        bus.emit('show-loader');
        bus.emit('check-indexedDB');
        bus.on('success:check-indexedDB', this.start);
    }

    start = () => {
        bus.off('success:check-indexedDB', this.start);
        bus.emit('hide-loader');
        if (!this.gameScene) {
            this.gameScene = new PlayingScene(this.root);
        }
        if (!this.gameCore) {
            this.gameCore = new this.GameConstructor();
        }

        this.gameCore.start();
        bus.on(events.FINISH_GAME, this.destroy);
    };

    destroy = () => {
        this.gameCore.destroy();
        this.gameScene.destroy();
        bus.off(events.FINISH_GAME);
    }
}
