import { AjaxModule } from '../modules/ajax.js';

export class BoardService {
    constructor() {
    }

    static getLeaders() {
        return AjaxModule.get({
           url: '/getLeaders'
        });
    }
}
