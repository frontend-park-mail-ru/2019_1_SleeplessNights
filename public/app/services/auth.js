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

    static setAuthorised(data) {
        user.isAuthorised = true;
        user.nickname = data.nickname;
        user.avatar_path = data.avatar_path;
        Cookie.add('authorised', 1, 1)
    }

    static removeAuthorised() {
        user.isAuthorised = false;
        Cookie.erase('authorised');
    }
}
