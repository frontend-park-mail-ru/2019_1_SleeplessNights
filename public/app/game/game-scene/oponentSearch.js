import { GopherComponent } from '../../components/gopher/gopher.js';
import { events } from '../core/events.js';
import bus from '../../modules/bus.js';

export class OpponentSearch {
    constructor(root) {
        this.root = root;
        this.button = {
            className: 'btn_primary2 btn_big btn_modal',
            text: 'Играть',
            dataHref: '/singleplayer'
        };

        bus.on(events.ROOM_SEARCHING, this.render);
        bus.on(events.FOUND_OPPONENT, this.destroy);
    }

    render = () => {
        this.gopher = new GopherComponent({
            customClasses: 'gopher-modal',
            mode: 'modal',
            button: this.button
        });

        this.root.insertAdjacentHTML('beforeend', this.gopher.template);
        this.gopher.startActing();
        this.gopher.showModal();
        this.gopher.say(`Привет ${user.nickname}. Пока что нет никого онлайн чтобы играть с тобой, но ты можешь играть со мной`, false);
    };

    destroy = () => {
        this.gopher.hideModal();
        this.gopher.destroy();

        bus.off(events.ROOM_SEARCHING, this.render);
        bus.off(events.FOUND_OPPONENT, this.destroy);
    };
}
