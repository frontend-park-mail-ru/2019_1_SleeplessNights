import { AjaxModule } from '../modules/ajax.js';

export class ScoreboardService {
    static getLeaders(page) {
        return AjaxModule.get({
            url: `/api/leaders?page=${page}`
        });
    }
}
