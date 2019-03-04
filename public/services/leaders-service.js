import { AJAXService } from './ajax-service.js';

export class LeadersService {
    constructor() {
        this._ajax = new AJAXService();
    }

    getLeaders() {
        return this._ajax.get({
           url: '/getLeaders'
        });
    }
}
