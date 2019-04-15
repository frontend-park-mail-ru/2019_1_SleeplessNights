import { modes } from './modes.js';
import { SinglePlayer } from './core/singlePlayer.js';
import { MultiPlayer }  from './core/multiPlayer.js';
import { GameController } from './controller.js';
import { PlayingScene }   from './game-scene/playing.js';
import { events } from './core/events.js';

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

        this.gameScene = new PlayingScene(root);
        this.gameCore = new GameConstructor();
        this.gameContoller = new GameController();
    }

    start() {
        this.gameCore.start();
        bus.on(events.FINISH_GAME, this.destroy);
    }

    destroy = () => {
        this.gameCore.destroy();
        this.gameScene.destroy();
        bus.off(events.FINISH_GAME);
    }
}
