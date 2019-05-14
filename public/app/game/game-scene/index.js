import { events } from '../core/events.js';
import bus from '../../modules/bus.js';

export class GameScene {
    constructor(root) {
        this.root = root;
        this.avatarMe = null;
        this.avatarOpponent = null;
        this.backButton = document.getElementsByClassName('back-to-menu-btn ')[0];

        bus.on(`success:${events.GET_USER}-${user.nickname}`, this.onSetMyProfile);
        bus.on(events.SET_OPPONENT_PROFILE, this.onSetOpponentProfile);
        // this.backButton.addEventListener('click', this.askForExit);
    }

    onSetMyProfile = (data) => {
        if (data.length) {
            this.avatarMe.src = data[0].avatarPath;
        }
    };

    onSetOpponentProfile = (data) => {
        this.avatarOpponent.src = data.avatarPath;
        const opponentName = document.getElementById('opponentName');
        opponentName.innerHTML = data.nickname;
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
        bus.off(`success:${events.GET_USER}-${user.nickname}`, this.onSetMyProfile);
        bus.off(events.SET_OPPONENT_PROFILE, this.onSetOpponentProfile);
        // this.backButton.removeEventListener('click', this.askForExit);
    }
}
