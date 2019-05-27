import { FormComponent } from '../components/form/form.js';
import { LinkComponent } from '../components/link/link.js';
import { ContainerComponent } from '../components/container/container.js';
import { BaseView } from './base.js';
import { animationTime } from '../modules/constants.js';
import bus from '../modules/bus.js';

export class SignUpView extends BaseView {
    constructor(el) {
        super(el);
        this._pageTitle = 'Регистрация';
        this._side ='';
        this._formGroups = [
            {
                customClasses: '',
                content: {
                    type: 'email',
                    customClasses: '',
                    placeholder: 'Почта',
                    name: 'email',
                    value: ''
                }
            },
            {
                customClasses: '',
                content: {
                    type: 'text',
                    customClasses: '',
                    placeholder: 'Никнейм',
                    name: 'nickname',
                    value: ''
                }
            },
            {
                customClasses: '',
                content: {
                    type: 'password',
                    customClasses: '',
                    placeholder: 'Пароль',
                    name: 'password',
                    value: ''
                }
            },
            {
                customClasses: '',
                content: {
                    type: 'password',
                    customClasses: '',
                    placeholder: 'Повторите пароль',
                    name: 'password2',
                    value: ''
                }
            },
            {
                customClasses: 'form__group_center',
                content: {
                    type: 'submit',
                    customClasses: 'btn btn_primary2',
                    placeholder: '',
                    name: '',
                    value: 'Зарегистрироваться'
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
                name: 'person_add'
            },
            name: 'Регистрация'
        };
    }

    show() {
        this._render();
        super.show();
    }

    _render() {
        const link = new LinkComponent({
            className: 'link_primary',
            href: 'login',
            dataHref: 'login',
            text: 'Заходи!'
        });

        this._form = new FormComponent({
            formGroups: this._formGroups
        });

        const innerContainer = new ContainerComponent({
            customClasses: 'form_w50 justify-content-center container_column',
            content: ` ${this.header.template} ${this._form.template} `
        });

        this.outerContainer = new ContainerComponent({
            customClasses: 'w74 container_theme-primary1 align-items-center justify-content-center',
            content: innerContainer.template
        });

        this.loginContainer = new ContainerComponent({
            customClasses: 'w20 container_column container_theme-primary2 justify-content-center align-items-center overflow-hidden',
            content: `<p>Есть аккаунт?</p> ${link.template}`
        });

        super.renderContainer({
            customClasses: 'container_skewed h100 container__absolute w100',
            container: `
                ${this.backBtn.template}
                ${this.loginContainer.template}
                ${this.outerContainer.template}
            `,
        });
        
        this._onSubmit();
        this.startListening();
    }

    _onSubmit() {
        bus.on('error:signup', (data) =>
            Object.entries(data).forEach((item) =>
                this._form.addError(item[0], item[1])
            )
        );

        bus.on('success:check-validity-signup', () =>
            bus.emit('signup', this._formData)
        );

        this._form.on('submit', (event) => {
            event.preventDefault();

            this._formData = new FormData(event.target);
            const inputs = this._form.formControls.filter(fc => fc.type !== 'submit');

            this._form.reset();
            bus.emit('check-validity-signup', inputs);
        });
    }

    startListening() {
        this.loginContainer.on('mouseover', () => this._side = 'to-login');
        this.backBtn.container.on('mouseover', () => this._side = 'to-main');
    }

    hideAnimation() {
        this.backBtn.container.hideContent();
        this.outerContainer.hideContent();
        this.loginContainer.hideContent();

        if (this._side === 'to-login') {
            this.outerContainer.addClass('anim-width-to-20');
            this.loginContainer.addClass('anim-width-to-74');
        } else {
            this.backBtn.container.addClass('anim-width-to-50');
            this.outerContainer.addClass('anim-width-to-0');
            this.loginContainer.addClass('anim-width-to-50');
        }

        setTimeout(() => {
            if (this._side === 'to-login') {
                this.outerContainer.removeClass('anim-width-to-20');
                this.loginContainer.removeClass('anim-width-to-74');
            } else {
                this.backBtn.container.removeClass('anim-width-to-50');
                this.outerContainer.removeClass('anim-width-to-0');
                this.loginContainer.removeClass('anim-width-to-50');
            }
        }, animationTime * 1000 + 350);
    }

    showAnimation() {
        this.backBtn.container.showContent();
        this.outerContainer.showContent();
        this.loginContainer.showContent();
    }
}
