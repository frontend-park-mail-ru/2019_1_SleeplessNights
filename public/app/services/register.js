import { AjaxModule } from '../modules/ajax.js';
import Validators from '../modules/validators.js';

export class RegisterService {
    static register(data) {
        return AjaxModule.post({
            url: '/api/user',
            body: data
        });
    }

    static checkValidity(formControls) {
        return new Promise((resolve, reject) => {
            let wholeRes = true;
            const password2 = formControls.pop();
            const errors = {};

            formControls.forEach(fc => {
                const { res , error } = Validators.isValid(fc.name, fc.value);
                if (!res) {
                    errors[fc.name] = error;
                }

                wholeRes &= res;
            });

            if (wholeRes) {
                const password = formControls.pop();
                if (password2.value !== password.value) {
                    errors[password2.name] = 'Пароли не совподают';
                }

                wholeRes = password2.value === password.value;
            }

            wholeRes ? resolve() : reject(errors);
        });
    }
}
