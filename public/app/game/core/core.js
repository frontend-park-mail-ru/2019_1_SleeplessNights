import { events } from './events.js';
import idb from '../../modules/indexdb.js';
import bus from '../../modules/bus.js'

export class GameCore {
    constructor() {
        this.me = {
            avatarPath: '/assets/img/default-avatar.png',
            nickname: window.user.nickname,
            lastMove: null
        };
        this.gameMatrix = [];
        this.opponent = null;
        this.cellCount = 8;
        this.colors = [
            {
                color: '#B3B156'
            },
            {
                color: '#FFFD94'
            },
            {
                color: '#ADE0FF'
            },
            {
                color: '#FFB454'
            },
            {
                color:'#00FFC5',
            },
            {
                color: '#CC6264',
            }
        ];
    }

    start() {
        bus.on(events.START_GAME, this.onGameStarted);
        bus.on(events.FINISH_GAME, this.onGameFinished);
        bus.on('fill-pack-list', this.onFillPacksList);
        bus.on('selected-cell', this.onSelectedCell);
        bus.on('success:get-pack-id-', this.onGetPacks);
        bus.on(`success:get-user-nickname-${user.nickname}`, this.getMe);
        bus.on('set-opponent-profile', this.onSetOpponentProfile);

        idb.getAll('user', 'nickname', user.nickname, 1);
    }

    getMe = (data) => {
        if (data.length) {
            this.me.avatarPath = data[0].avatarPath;
        }

        bus.emit('loaded-users', { me: this.me, opponent: this.opponent });
    };

    onSetOpponentProfile = (data) => {
        this.opponent = {
            avatarPath: data.avatarPath,
            nickname: data.nickname,
            lastMove: null
        };
    };

    onGameStarted() {
        throw new Error('This method must be overridden');
    }

    onGameFinished() {
        throw new Error('This method must be overridden');
    }

    onGetPacks = () => {
        throw new Error('This method must be overridden');
    };

    onFillPacksList = () => {
        throw new Error('This method must be overridden');
    };

    onSelectedCell = () => {
        throw new Error('This method must be overridden');
    };

    destroy() {
        bus.off(events.START_GAME, this.onGameStarted);
        bus.off(events.FINISH_GAME, this.onGameFinished);
        bus.off('fill-pack-list', this.onFillPacksList);
        bus.off('selected-cell', this.onSelectedCell);
        bus.off('success:get-pack-id-', this.onGetPacks);
        bus.off(`success:get-user-nickname-${user.nickname}`, this.getMe);
    }
}
