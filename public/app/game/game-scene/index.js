import { events } from '../core/events.js';
import bus from '../../modules/bus.js';

export class GameScene {
    constructor(root) {
        this.root = root;
        this.avatarMe = null;
        this.avatarOpponent = null;
        this.backButton = document.getElementsByClassName('back-to-menu-btn ')[0];

        bus.on(events.LOADED_PLAYER, this.updatePlayer);
        this.backButton.addEventListener('click', this.askForExit);
    }

    updatePlayer = ({ player, avatarPath }) => {
        this[player === 'me' ? 'avatarMe' : 'avatarOpponent'].src = avatarPath;
    };

    askForExit = (event) => {
        const ask = confirm(`При выходе из игры удаляеться текущая сессия игры.
                        Действительно ли хотите выйти ?`);

        if (ask) {
            bus.emit(events.FINISH_GAME, true);
        } else {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    destroy() {
        bus.off('loaded-users', this.updatePlayers);
        this.backButton.removeEventListener('click', this.askForExit);
    }
}
