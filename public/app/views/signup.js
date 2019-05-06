import { FormComponent } from '../components/form/form.js';
import { LinkComponent } from '../components/link/link.js';
import { CardComponent } from '../components/card/card.js';
import { HeaderComponent } from '../components/header/header.js';
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
                    customClasses: 'btn btn_primary',
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

    show() {
        this._render();
        super.show();
    }

    _render() {
        const link = new LinkComponent({
            className: 'link_primary',
            href: 'login',
            dataHref: 'login',
            text: 'Войти'
        });

        this._form = new FormComponent({
            formGroups: this._formGroups
        });

        const card = new CardComponent({
            customClasses: 'shadow-l',
            title: 'Регистрация',
            body: this._form.template
        });

        const card2 = new CardComponent({
            customClasses: 'card_centered_both shadow-l',
            title: '',
            body: `Аккаунт уже есть? ${link.template}`
        });
        // const header = new HeaderComponent({ title: 'Регистрация' }); // ${header.template}
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
