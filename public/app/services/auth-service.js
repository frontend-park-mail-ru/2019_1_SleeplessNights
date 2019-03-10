import { AjaxModule } from '../modules/ajax.js';

export class AuthService {
    static auth(data) {
        return AjaxModule.post({
            url: '/api/auth',
            body: data
        });
    }
}
