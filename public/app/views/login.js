import { FormComponent } from '../components/form/form.js';
import { LinkComponent } from '../components/link/link.js';
import { CardComponent } from '../components/card/card.js';
import { HeaderComponent } from '../components/header/header.js';
import { BaseView } from './base.js';

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

    show() {
        this._render();
        super.show();
    }

    _render() {
        const link = new LinkComponent({
            className: 'link_primary',
            href: 'signup',
            dataHref: 'signup',
            text: 'Зарегистрироваться'
        });

        this._form = new FormComponent({
            formGroups: this._formGroups
        });

        const card = new CardComponent({
            customClasses: 'shadow-l',
            title: 'Авторизация',
            body: this._form.template
        });

        const card2 = new CardComponent({
            customClasses: 'shadow-l card_centered_both',
            title: '',
            body: `У вас нет аккаунта? ${link.template}`
        });
        // const header = new HeaderComponent({ title: 'Авторизация' }); ${header.template}
        super.renderContainer({
            customClasses: '',
            btnBack: true,
            container: `
                ${card.template}
                ${card2.template}
            `
        });

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
            const inputs = this._form.formControls.filter(fc => fc.type === 'email');

            this._form.reset();
            bus.emit('check-validity-login', inputs);
        });
    }
}
