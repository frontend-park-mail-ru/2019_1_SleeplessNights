import { FormComponent } from '../components/form/form.js';
import { LinkComponent } from '../components/link/link.js';
import { HeaderComponent } from '../components/header/header.js';
import { IconComponent }   from '../components/icon/icon.js';
import { ContainerComponent } from '../components/_new/container/container.js';
import { BaseView } from './base.js';
import bus from '../modules/bus.js';

export class LoginView extends BaseView {
    _pageTitle;
    _formGroups;
    _form;
    _formData;

    constructor(el) {
        super(el);
        this._pageTitle = 'Авторизация';
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
                    customClasses: 'btn btn_primary1',
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

    get backBtn() {
        const link = new LinkComponent({
            className: 'link_primary',
            href: '',
            dataHref: '/',
            text: '',
            icon: {
                customClasses: 'md-48',
                name: 'arrow_back_ios'
            }
        });

        this._backBtn = new ContainerComponent({
            customClasses: 'container__col-w10 container_theme-primary1 container_align-items-flex-end container_justify-content-center',
            content: link.template
        });

        return this._backBtn;
    }

    get _header() {
        const icon = new IconComponent({
            customClasses: ' md-inherit md-48',
            name: 'exit_to_app'
        });

        return new HeaderComponent({
            title: `${icon.template} Авторизация`
        });
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
            customClasses: 'container__col-w50 container_justify-content-center',
            content: `
                ${this._header.template}
                ${this._form.template} 
            `
        });

        const outerContainer = new ContainerComponent({
            customClasses: 'container__col-w70 container_theme-primary2 container_align-items-center',
            content: innerContainer.template
        });

        const signupContainer = new ContainerComponent({
            customClasses: 'container__col-w20 container_theme-secondary1 container_justify-content-center',
            content: `Нет аккаунта? ${link.template}`
        });

        super.renderContainer({
            customClasses: 'container_skewed container__row-h100 container__absolute',
            container: `
                ${this.backBtn.template}
                ${outerContainer.template}
                ${signupContainer.template}
            `,
        });

        this._backBtn.href = '/';
        this._onSubmit();
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
}
