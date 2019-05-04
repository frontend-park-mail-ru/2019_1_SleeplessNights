import { Cookie } from '../modules/cookie.js';
import { AjaxModule } from '../modules/ajax.js';
import Validators from '../modules/validators.js';

export class AuthService {
    static auth(data) {
        return AjaxModule.post({
            url: '/api/session',
            body: data
        });
    }

    static logout() {
        return AjaxModule.delete({
            url: '/api/session'
        });
    }

    static checkValidity(formControls) {
        return new Promise((resolve, reject) => {
            let wholeRes = true;
            const errors = {};

            formControls.forEach(fc => {
                if (fc.name === 'password') {
                    if (!fc.value) {
                        errors[fc.name] = 'Поле не может быть пустым';
                        wholeRes &= false;
                    }
                } else {
                    const { res , error } = Validators.isValid(fc.name, fc.value);
                    if (!res) {
                        errors[fc.name] = error;
                    }

                    wholeRes &= res;
                }
            });

            wholeRes ? resolve() : reject(errors);
        });
    }

    static get isAuthorised() {
        return !!Cookie.read('authorised');
    }

    static setAuthorised(data) {
        user.isAuthorised = true;
        if (data.nickname) {
            user.nickname = data.nickname;
        }

        if (data.avatar_path) {
            user.avatar_path = data.avatar_path;
        }

        Cookie.add('authorised', 1, 1);
    }

    static removeAuthorised() {
        user.isAuthorised = false;
        Cookie.erase('authorised');
    }
}
