class Validators {
    constructor() {
        this.emailReg = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i);
        this.passwordReg = RegExp(/^(?=.*[A-Za-z0-9]).{6,}$/);
        this.usernameReg = RegExp(/^[A-Za-z0-9_-]{4,16}$/);

        this.validators = {};
        this.validators['password'] = this.checkPassword;
        this.validators['email'] = this.checkEmail;
        this.validators['nickname'] = this.checkNickname;
    }

    isValid(name, value) {
        if (!this.validators[name]) {
            console.log(`Invalid input type for validation ${name}`);
            return;
        }

        if (!value) {
            return { res: false , error: 'Поле не может быть пустым' }
        }

        return this.validators[name](value);
    }

    checkEmail = (value) => {
        const res = this.emailReg.test(value);
        return res ? { res } : { res , error: 'Невалидная почта' };
    };

    checkPassword = (value) => {
        const res = this.passwordReg.test(value);
        return res ? { res } : { res , error: `Пароль должен состоять минимум из 6 латинских символов и цифры 0-9` };
    };

    checkNickname = (value) => {
        const res = this.usernameReg.test(value);
        return res ? { res } : { res , error: 'Невалидная никнейм' };
    };
}

export default new Validators();
