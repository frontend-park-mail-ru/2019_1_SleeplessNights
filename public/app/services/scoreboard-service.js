import { AjaxModule } from '../modules/ajax.js';

export class ScoreboardService {
    static getLeaders() {
        return AjaxModule.get({
           url: '/getLeaders'
        });
    }
}
