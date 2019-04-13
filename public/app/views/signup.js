import { FormComponent } from '../components/form/form.js';
import { LinkComponent } from '../components/link/link.js';
import { CardComponent } from '../components/card/card.js';
import { HeaderComponent } from '../components/header/header.js';
import { gameName } from '../modules/constants.js';
import { BaseView } from './base.js';

export class SignUpView extends BaseView {
    _pageTitle;
    _formGroups;
    _form;

    constructor(el) {
        super(el);
        this._pageTitle = 'Регистрация';
        this._formGroups = [
            {
                customClasses: '',
                content: {
                    type: 'text',
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

        this._render();
    }

    get pageTitle(){
        return this._pageTitle;
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
            customClasses: '',
            title: 'Регистрация',
            body: this._form.template
        });

        const card2 = new CardComponent({
            customClasses: 'card_centered_both',
            title: '',
            body: `Аккаунт уже есть? ${link.template}`
        });

        const header = new HeaderComponent({ title: 'Описание игры' });

        super.renderContainer({
            customClasses: '',
            btnBack: true,
            container: `
                ${header.template}
                ${card.template}
                ${card2.template}
            `
        });

        this._submit();
    }

    _submit() {
        this._form.on('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(event.path[0]);

            if (this._form.isValid) {
                bus.emit('signup', formData)
                    .on('error:signup', (data) => {
                        Object.entries(data).forEach((item) => {
                            this._form.addError(item[0], item[1]);
                        });
                    });
            }
        });
    }
}
