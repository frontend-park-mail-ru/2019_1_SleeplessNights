import { FormComponent } from '../components/form/form.js';
import { LinkComponent } from '../components/link/link.js';
import { HeaderComponent } from '../components/header/header.js';
import { IconComponent }   from '../components/icon/icon.js';
import { ContainerComponent } from '../components/container/container.js';
import { BaseView } from './base.js';
import bus from '../modules/bus.js';

export class SignUpView extends BaseView {
    _pageTitle;
    _formGroups;
    _form;
    _formData;

    constructor(el) {
        super(el);
        this._pageTitle = 'Регистрация';
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
            name: 'person_add'
        });

        return new HeaderComponent({
            title: `${icon.template} Регистрация`
        });
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
            customClasses: 'container__col-w50 container_justify-content-center',
            content: `
                ${this._header.template}
                ${this._form.template} 
            `
        });

        const outerContainer = new ContainerComponent({
            customClasses: 'container__col-w70 container_theme-primary1 container_align-items-center',
            content: innerContainer.template
        });

        const loginContainer = new ContainerComponent({
            customClasses: 'container__col-w20 container_theme-primary2 container_justify-content-center container_align-items-center',
            content: `Есть аккаунт? ${link.template}`
        });

        super.renderContainer({
            customClasses: 'container_skewed container__row-h100 container__absolute',
            container: `
                ${this.backBtn.template}
                ${loginContainer.template}
                ${outerContainer.template}
            `,
        });

        this._backBtn.href = '/';
        this._onSubmit();
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
}
