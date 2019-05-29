import { SinglePlayer } from './core/singlePlayer.js';
import { MultiPlayer }  from './core/multiPlayer.js';
import { GameScene } from './game-scene/index.js';
import { events } from './core/events.js';
import { modes } from './modes.js';
import bus from '../modules/bus.js';

export class Game {
    constructor ({
        root,
        mode = ''
    } = {}) {
        this.root = root;
        this.mode = mode;
        this.GameConstructor = null;

        switch (this.mode) {
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

        bus.emit('show-loader');
        bus.emit('check-indexedDB');
        bus.on('success:check-indexedDB', this.start);
    }

    start = () => {
        bus.off('success:check-indexedDB', this.start);
        bus.emit('hide-loader');

        this.gameScene = new GameScene(this.root, this.mode);
        this.gameCore = new this.GameConstructor();

        this.gameCore.start();
        bus.on(events.FINISH_GAME, this.destroy);
    };

    destroy = () => {
        this.gameCore.destroy();
        this.gameScene.destroy();
        bus.off(events.FINISH_GAME);
    }
}
