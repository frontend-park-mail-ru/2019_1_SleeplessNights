import { FormComponent } from '../components/form/form.js';
import { LinkComponent } from '../components/link/link.js';
import { ContainerComponent } from '../components/container/container.js';
import { BaseView } from './base.js';
import { animationTime } from '../modules/constants.js';
import bus from '../modules/bus.js';

export class LoginView extends BaseView {
    constructor(el) {
        super(el);
        this._pageTitle = 'Авторизация';
        this._side ='';
        this._formGroups = [
            {
                customClasses: '',
                content: {
                    type: 'email',
                    customClasses: '',
                    placeholder: 'Почта',
                    name: 'email'
                }
            },
            {
                customClasses: '',
                content: {
                    type: 'password',
                    customClasses: '',
                    placeholder: 'Пароль',
                    name: 'password'
                }
            },
            {
                customClasses: 'form__group_center',
                content: {
                    type: 'submit',
                    customClasses: 'btn btn_primary',
                    placeholder: '',
                    name: '',
                    value: 'Войти'
                }
            }
        ];
    }

    get pageTitle() {
        return this._pageTitle;
    }

    get _backBtn() {
        return {
            position: 'left',
            className: 'container_theme-primary1'
        };
    }

    get _header() {
        return {
            icon: {
                customClasses: 'md-48',
                name: 'exit_to_app'
            },
            name: 'Авторизация'
        };
    }

    show() {
        this._render();
        super.show();
    }

    _render() {
        const link = new LinkComponent({
            className: 'link_primary',
            href: 'signup',
            dataHref: 'signup',
            text: 'Регистрируйся!'
        });

        this._form = new FormComponent({
            formGroups: this._formGroups
        });

        const innerContainer = new ContainerComponent({
            customClasses: 'form_w50 container_column',
            content: `
                ${this.header.template}
                ${this._form.template} 
            `
        });

        this.outerContainer = new ContainerComponent({
            customClasses: 'w74 container_theme-primary2 justify-content-center align-items-center',
            content: innerContainer.template
        });

        this.signupContainer = new ContainerComponent({
            customClasses: 'w20 container_column container_theme-secondary1 justify-content-center align-items-center overflow-hidden',
            content: `<p>Нет аккаунта?</p> ${link.template}`
        });

        super.renderContainer({
            customClasses: 'container_skewed container__absolute h100 w100',
            container: `
                ${this.backBtn.template}
                ${this.outerContainer.template}
                ${this.signupContainer.template}
            `,
        });

        this._onSubmit();
        this.startListening();
    }

    _onSubmit() {
        bus.on('error:login', (data) =>
            Object.entries(data).forEach((item) =>
                this._form.addError(item[0], item[1])
            )
        );

        bus.on('success:check-validity-login', () =>
            bus.emit('login', this._formData)
        );

        this._form.on('submit', (event) => {
            event.preventDefault();

            this._formData = new FormData(event.target);
            const inputs = this._form.formControls.filter(fc => fc.type !== 'submit');
            this._form.reset();
            bus.emit('check-validity-login', inputs);
        });
    }

    startListening() {
        this.signupContainer.on('mouseover', () => this._side = 'to-signup');
        this.backBtn.container.on('mouseover', () => this._side = 'to-main');
    }

    hideAnimation() {
        this.backBtn.container.hideContent();
        this.outerContainer.hideContent();
        this.signupContainer.hideContent();

        if (this._side === 'to-signup') {
            this.outerContainer.addClass('anim-width-to-20');
            this.signupContainer.addClass('anim-width-to-74');
        } else {
            this.backBtn.container.addClass('anim-width-to-50');
            this.outerContainer.addClass('anim-width-to-50');
            this.signupContainer.addClass('anim-width-to-0');
        }

        setTimeout(() => {
            if (this._side === 'to-signup') {
                this.outerContainer.removeClass('anim-width-to-20');
                this.signupContainer.removeClass('anim-width-to-74');
            } else {
                this.backBtn.container.removeClass('anim-width-to-50');
                this.outerContainer.removeClass('anim-width-to-50');
                this.signupContainer.removeClass('anim-width-to-0');
            }
        }, animationTime * 1000 + 350);
    }

    showAnimation() {
        this.backBtn.container.showContent();
        this.outerContainer.showContent();
        this.signupContainer.showContent();
    }
}
