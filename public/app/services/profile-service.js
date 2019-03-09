import { AjaxModule } from '../modules/ajax.js';

export class ProfileService {
    static updateProfile(data) {
        return AjaxModule.patch({
            url: '/api/profile',
            body: data
        });
    }
}
