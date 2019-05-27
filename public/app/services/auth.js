import { Cookie } from '../modules/cookie.js';
import { AjaxModule } from '../modules/ajax.js';
import { makeAvatarPath } from '../modules/utils.js';
import Validators from '../modules/validators.js';
import idb from '../modules/indexdb.js';
import bus from '../modules/bus.js';

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

    static get id() {
        return AuthService.isAuthorised ? +Cookie.read('authorised') : 1;
    }

    static setAuthorised(data) {
        user.isAuthorised = true;
        user.nickname = data.nickname;

        idb.getAll('user', 'email', data.email);
        bus.on(`success:get-user-email-${data.email}`, (user) => {
            if (!user.length) {
                idb.add('user', [{
                    nickname: data.nickname,
                    email: data.email,
                    avatarPath: makeAvatarPath(data.avatarPath)
                }]);

                AuthService.setAuthorised(data);
            } else {
                window.user.id = user[0].id;
                Cookie.add('authorised', window.user.id, 1);
            }
        });
    }

    static removeAuthorised() {
        user.isAuthorised = false;
        Cookie.erase('authorised');
    }
}
