import { HeaderComponent } from '../header/header.js'
import { LeadersService } from '../../services/leaders-service.js';

export class LeadersComponent {
    _template = Handlebars.templates.leaders;
    _pageTitle = 'Таблица лидеров';
    _players = [];

    constructor(el = document.body) {
        this._el = el;
        this._title = 'Лучшые игроки';
        this._subtitle = '';
        this._btnHome = true;

        this._leaderService = new LeadersService();
    }

    get pageTitle(){
        return this._pageTitle;
    }

    render() {
        const header = new HeaderComponent({
            title: this._title,
            subtitle: this._subtitle,
            btnHome: this._btnHome
        });

        this._el.innerHTML = this._template({
            header: header.template,
            players: this._players
        });

        this._leaderService.getLeaders()
            .then(res => res.data)
            .then(players => {
                this._el.innerHTML = this._template({
                    header: header.template,
                    players: players
                });
            })
            .catch(error => console.error('Error:', error));
    }
}
