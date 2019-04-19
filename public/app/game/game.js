import { modes } from './modes.js';
import { SinglePlayer } from './core/singlePlayer.js';
import { MultiPlayer }  from './core/multiPlayer.js';
import { GameController } from './controller.js';
import { PlayingScene }   from './game-scene/playing.js';
import { events } from './core/events.js';
import idb from '../modules/indexdb.js';

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

        this.root.innerHTML = `<img alt="Loader" src='/assets/img/loader.svg'>`;
        this.waiterCount = 0;
        this.waiter = setInterval(() => {
            this.waiterCount++;
            idb.getAll('user', 'nickname', user.nickname, 1);
            bus.on(`success:get-user-nickname-${user.nickname}`, this.waitDB);
        }, 1000);
    }

    waitDB = (data) => {
        if (data.length) {
            this.root.innerHTML = '';
            this.gameScene = new PlayingScene(this.root);
            this.gameCore = new this.GameConstructor();
            this.gameContoller = new GameController();
            this.start();

            clearInterval(this.waiter);
            for (let i = 0; i < this.waiterCount; i++) {
                bus.off(`success:get-user-nickname-${user.nickname}`, this.waitDB);
            }
        }
    };

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
