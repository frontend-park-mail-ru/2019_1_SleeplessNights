import { AjaxModule } from '../modules/ajax.js';

export class ProfileService {
    static getProfile() {
        return AjaxModule.get({
            url: '/api/profile'
        });
    }

    static getAvatar() {
        return AjaxModule.get({
            url: '/api/avatar'
        });
    }

    static updateProfile(data) {
        return AjaxModule.patch({
            url: '/api/profile',
            body: data
        });
    }
}
