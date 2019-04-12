import { modes } from './modes.js';
import { SinglePlayer } from './core/single_player.js';
import { MultiPlayer }  from './core/multi_player.js';
import { GameScene } from './game-scene/index.js';

export class Game {
    constructor ({
        root,
        mode = ''
    } = {}) {
        let GameConstructor = null;

        switch (mode) {
            case modes.SINGLE_PLAYER:
                GameConstructor = SinglePlayer;
                break;
            case modes.MULTI_PLAYER:
                GameConstructor = MultiPlayer;
                break;
            default:
                throw new Error(`Invalid game mode ${mode}`);
        }

        this.gameScene = new GameScene();
        this.gameCore = new GameConstructor(root);
    }

    start() {
       this.gameCore.start();
    }

    destroy() {
        this.gameCore.destroy();
    }
}
