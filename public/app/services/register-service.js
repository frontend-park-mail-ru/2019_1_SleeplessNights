import { AjaxModule } from '../modules/ajax.js';

export class RegisterService {
    static register(data) {
        return AjaxModule.post({
            url: '/api/user',
            body: data
        });
    }
}
