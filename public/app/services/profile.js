import { AjaxModule } from '../modules/ajax.js';
import Validators from '../modules/validators.js';

export class ProfileService {
    static getProfile() {
        return AjaxModule.get({
            url: '/api/profile'
        });
    }

    static updateProfile(data) {
        return AjaxModule.patch({
            url: '/api/profile',
            body: data
        });
    }

    static checkValidity(formControls) {
        return new Promise((resolve, reject) => {
            let wholeRes = true;
            const errors = {};

            formControls.forEach(fc => {
                const { res , error } = Validators.isValid(fc.name, fc.value);
                if (!res) {
                    errors[fc.name] = error;
                }

                wholeRes &= res;
            });

            wholeRes ? resolve() : reject(errors);
        });
    }
}
