import { TimerComponent }     from '../../components/timer/timer.js';
import { AvatarComponent }    from '../../components/avatar/avatar.js';
import { ContainerComponent } from '../../components/container/container.js';
import { ButtonHomeComponent } from '../../components/buttonHome/buttonHome.js';
import { PackSelectScene }    from './packSelect.js';
import { OpponentSearch } from './oponentSearch.js';
import { PlayingScene }   from './playing.js';
import { Gopher } from './gopher.js';
import { modes }  from '../modes.js';
import { events } from '../core/events.js';
import bus from '../../modules/bus.js';

export class GameScene {
    constructor(root, mode) {
        this.root = root;
        this.active = true;
        this.avatarMe = null;
        this.avatarOpponent = null;
        this.currentScene = null;
        this.mode = mode === modes.SINGLE_PLAYER ? '1' : '2';
        this.bgColor = `var(--primary-color${this.mode})`;

        bus.on(events.START_TIMEOUT_PACK, this.startTimeout);
        bus.on(events.STOP_TIMEOUT_PACK,  this.stopTimeout);
        bus.on(events.SET_CURRENT_PLAYER, this.onChangePlayer);
        bus.on(events.ENDED_PACK_SELECTION, this.onEndPackSelection);
        bus.on(events.SET_OPPONENT_PROFILE, this.onSetOpponentProfile);
        bus.on(events.START_TIMEOUT_QUESTION, this.startTimeout);
        bus.on(events.STOP_TIMEOUT_QUESTION,  this.stopTimeout);
        bus.on(`success:${events.GET_USER}-${user.nickname}`, this.onSetMyProfile);
        bus.on(events.FOUND_OPPONENT, this.onFoundOpponent);

        this.render();
    }
    
    get currentTimer() {
        return this[this.currentPlayer === 'me' ? 'timerMe':  'timerOpponent'];
    }

    render() {
        this.backButton = new ButtonHomeComponent({
            mode: 'minified',
            position: 'left',
            className: 'container_theme-primary2'
        });

        this.timerMe = new TimerComponent();
        this.avatarMe = new AvatarComponent({ customClasses: 'avatar_game-board' });
        this.leftContainer = new ContainerComponent({
            customClasses: 'w25 align-items-center justify-content-center container_column',
            content: `
                ${this.backButton.template}
                ${this.timerMe.template}
                ${this.avatarMe.template}
                <h3 class='container_theme-primary${this.mode}'>${user.nickname}</h3>
            `
        });

        this.timerOpponent = new TimerComponent();
        this.avatarOpponent = new AvatarComponent({ customClasses: 'avatar_game-board' });
        this.rightContainer = new ContainerComponent({
            customClasses: 'w25 align-items-center justify-content-center container_column',
            content: `
                ${this.timerOpponent.template}
                ${this.avatarOpponent.template}
                ${this.mode === '2' ? `<h3 id='opponentName' class='container_theme-primary${this.mode}'>Opponent</h3>` : ''}         
            `
        });

        this.centreContainer = new ContainerComponent({
            customClasses: 'container_column w50 align-items-center justify-content-center'
        });

        this.root.content =  `
                ${this.leftContainer.template}
                ${this.centreContainer.template}
                ${this.rightContainer.template}
            `;

        this.root.background = `linear-gradient(94deg, ${this.bgColor} 24.9%, #fff 25%, #fff 74.9%, ${this.bgColor} 75%)`;

        if (this.mode === '2') {
           this.currentScene = new OpponentSearch(this.root);
        } else {
            this.gopher = new Gopher(this.avatarOpponent);
            this.currentScene = new PackSelectScene(this.root, this.centreContainer);
        }

        this.backButton = document.getElementsByClassName('back-to-menu-btn ')[0];
        this.backButton.addEventListener('click', this.askForExit);
        this.showAnimation();
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

    onChangePlayer = (pl) => {
        const cond = pl === 'me';
        this.currentPlayer = pl;
        this[cond ? 'avatarMe': 'avatarOpponent'].addClass('avatar_border-weighty');
        this[cond ? 'avatarOpponent': 'avatarMe'].removeClass('avatar_border-weighty');
    };

    onFoundOpponent = () => {
        this.currentScene = new PackSelectScene(this.root, this.centreContainer);
    };

    onEndPackSelection = () => {
        setTimeout(() => {
            this.currentScene = new PlayingScene(this.root, this.centreContainer);
        }, 1000);
    };
    
    startTimeout = (time) => this.currentTimer.start(time);
    stopTimeout = () => this.currentTimer.stop();

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

    showAnimation() {
        this.centreContainer.showContent();
        this.leftContainer.showContent();
        this.rightContainer.showContent();
    }

    hideAnimation() {
        this.root.addClass(`anim-page-play-${this.mode}`);
        this.root._innerElem.removeAttribute('style');
        this.rightContainer.hideContent();
        this.leftContainer.hideContent();
        this.centreContainer.hideContent();
    }

    destroy() {
        if (this.active) {
            this.hideAnimation();
            this.active = false;
        }

        if (this.mode === '1') {
            this.gopher.destroy();
        }

        this.currentScene.destroy();

        bus.off(events.START_TIMEOUT_PACK, this.startTimeout);
        bus.off(events.STOP_TIMEOUT_PACK,  this.stopTimeout);
        bus.off(events.SET_CURRENT_PLAYER, this.onChangePlayer);
        bus.off(events.ENDED_PACK_SELECTION, this.onEndPackSelection);
        bus.off(events.SET_OPPONENT_PROFILE, this.onSetOpponentProfile);
        bus.off(events.START_TIMEOUT_QUESTION, this.startTimeout);
        bus.off(events.STOP_TIMEOUT_QUESTION,  this.stopTimeout);
        bus.off(`success:${events.GET_USER}-${user.nickname}`, this.onSetMyProfile);
        bus.off(events.FOUND_OPPONENT, this.onFoundOpponent);
        this.backButton.removeEventListener('click', this.askForExit);
    }
}
