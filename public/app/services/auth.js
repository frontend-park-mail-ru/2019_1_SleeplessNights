import { Cookie } from '../modules/cookie.js';

export class AuthService {
    static auth(data) {
        return ajax.post({
            url: '/api/session',
            body: data
        });
    }

    static get isAuthorised() {
        return !!Cookie.read('authorised');
    }

    static setAuthorised() {
        user.isAuthorised = true;
        Cookie.add('authorised', 1, 1)
    }

    static removeAuthorised() {
        user.isAuthorised = false;
        Cookie.erase('authorised');
    }
}
