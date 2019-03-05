import { AjaxModule } from '../modules/ajax.js';

export class LeadersService {
    constructor() {
        this._ajax = AjaxModule;
    }

    getLeaders() {
        return this._ajax.get({
           url: '/getLeaders'
        });
    }
}
