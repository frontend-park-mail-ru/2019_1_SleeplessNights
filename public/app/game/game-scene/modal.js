import { GopherComponent } from '../../components/gopher/gopher.js';
import { ButtonComponent} from '../../components/button/button.js';
import { events } from '../core/events.js';
import bus from '../../modules/bus.js';

export class Modal {
    constructor(root) {
        this.root = root;

        bus.on(events.NOT_AUTHORISED, this.onNotAuthorised);
        bus.on(events.ROOM_SEARCHING, this.onRoomSearching);
        bus.on(events.FOUND_OPPONENT, this.onFoundOpponent);
        bus.on(events.LEAVE_GAME,     this.onLeaveGame);
        bus.on(`game:ws-failed`, this.onWsFailed);
    }

    onWsFailed = () => {
        const button = new ButtonComponent({
            className: 'btn_primary2 btn_big btn_modal',
            text: 'Играть',
            dataHref: '/singleplayer'
        });

        this.gopher = new GopherComponent({
            customClasses: 'gopher-modal',
            mode: 'modal',
            button: button.template
        });

        this.renderGopher();
        this.gopher.say(`Привет ${user.nickname}. Что-то случилось с сервером, но ты можешь поиграть со мной`, false);
    };

    onLeaveGame = () => {
        const yesButton = new ButtonComponent({
            className: 'btn_primary2 btn_big btn_modal',
            text: 'Да',
            dataHref: '/'
        });

        const noButton= new ButtonComponent({
            className: 'btn_primary2 btn_big btn_modal2',
            text: 'Нет',
            dataHref: ''
        });

        this.gopher = new GopherComponent({
            customClasses: 'gopher-modal',
            mode: 'modal',
            button: yesButton.template + noButton.template
        });

        this.renderGopher();
        noButton.on('click', () => {
            this.gopher.hideModal();
            this.gopher.destroy();
        });
        this.gopher.say(`Твоя текущая сессия игры удалится. Ты действительно хочешь выйти?`, false);
    };

    onNotAuthorised = () => {
        const singleplayer = new ButtonComponent({
            className: 'btn_primary2 btn_big btn_modal',
            text: 'Играть оффлайн',
            dataHref: '/singleplayer'
        });

        const singup = new ButtonComponent({
            className: 'btn_primary2 btn_big btn_modal2',
            text: 'Регистрация',
            dataHref: '/signup'
        });

        this.gopher = new GopherComponent({
            customClasses: 'gopher-modal',
            mode: 'modal',
            button: singleplayer.template + singup.template
        });

        this.renderGopher();
        this.gopher.say(`Привет ${user.nickname}. К сожалению, в мультиплеере нельзя играть без регистрации!`, false);
    };

    onRoomSearching = () => {
        const button = new ButtonComponent({
            className: 'btn_primary2 btn_big btn_modal',
            text: 'Играть',
            dataHref: '/singleplayer'
        });

        this.gopher = new GopherComponent({
            customClasses: 'gopher-modal',
            mode: 'modal',
            button: button.template
        });

        this.renderGopher();
        this.gopher.say(`Привет ${user.nickname}. Нет никого онлайн, чтобы поиграть с тобой, но ты можешь поиграть со мной`, false);
    };

    onFoundOpponent = () => {
        this.gopher.hideModal();
        this.gopher.destroy();
        bus.off(events.ROOM_SEARCHING, this.onRoomSearching);
        bus.off(events.FOUND_OPPONENT, this.onFoundOpponent);
    };

    renderGopher() {
        this.root.insertAdjacentHTML('beforeend', this.gopher.template);
        this.gopher.startActing();
        this.gopher.showModal();
    }

    destroy = () => {
        if (this.gopher) {
            this.gopher.hideModal();
            this.gopher.destroy();
        }

        bus.off(events.LEAVE_GAME,      this.onLeaveGame);
        bus.off(`game:ws-failed`, this.onWsFailed);
        bus.off(events.NOT_AUTHORISED, this.onNotAuthorised);
    };
}
