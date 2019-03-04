import {HeaderComponent} from '../header/header.js'

export class LeadersComponent {
    _template = Handlebars.templates.leaders;
    _pageTitle = 'Таблица лидеров';
    _players = [
        {
            name: 'Jahongir',
            win: 0,
            lost: 0,
            playingTime: 60
        }
    ];

    constructor(el = document.body) {
        this._el = el;
        this._title = 'Лучшые игроки';
        this._subtitle = '';
        this._btnHome = true;
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
    }

    getLeaders() {
        // here will be AJAX query to server
    }
}
