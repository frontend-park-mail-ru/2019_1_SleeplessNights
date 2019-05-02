import { events } from '../core/events.js';

export class GameScene {
    constructor(root) {
        this.root = root;
        this.avatarMe = null;
        this.avatarOponent = null;
        this.backButton = document.getElementsByClassName('back-to-menu-btn ')[0];

        bus.on('loaded-users', this.updatePlayers);
        this.backButton.addEventListener('click', this.askForExit);
    }

    updatePlayers = ({me, opponent}) => {
        this.avatarMe.src = me.avatar_path;
        this.avatarOponent.src = opponent.avatar_path;
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
