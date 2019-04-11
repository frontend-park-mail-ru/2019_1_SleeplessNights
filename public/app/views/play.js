import { BaseView }        from './base.js';
import { TimerComponent }  from '../components/timer/timer.js';
import { AvatarComponent } from '../components/avatar/avatar.js';

export class PlayView extends BaseView {
    constructor(el) {
        super(el);
        this._pageTitle = 'Играть';
        this._render();
    }

    get pageTitle(){
        return this._pageTitle;
    }

    _render() {
        const timer = new TimerComponent({ time: 8});

        const avatar1 = new AvatarComponent();
        const avatar2 = new AvatarComponent();

        super.renderContainer({
            customClasses: 'container_align-y_center',
            header: {
                btnHome:  true
            },
            container: avatar1.template + avatar2.template
        });

        // bus.emit('start-timer');
    }
}
