import { events } from './events.js';
import { gameConsts } from '../constants.js';
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
        this.cellCount = gameConsts.CELL_COUNT;
        this.colors = gameConsts.COLORS.map(c => { return {color: c} });
    }

    start() {
        bus.on(events.START_GAME,  this.onGameStarted);
        bus.on(events.FINISH_GAME, this.onGameFinished);
        bus.on(events.SELECTED_CELL,        this.onSelectedCell);
        bus.on(`success:${events.GET_PACK}-`, this.onGetPacks);
        bus.on(events.SET_OPPONENT_PROFILE, this.onSetOpponentProfile);
        bus.on(events.SELECTED_ANSWER,      this.onSelectedAnswer);
        bus.on(`success:${events.GET_USER}-${user.nickname}`, this.getMe);

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

    onGetPacks = () => {
        throw new Error('This method must be overridden');
    };

    onFillPacksList = () => {
        throw new Error('This method must be overridden');
    };

    onSelectedCell = () => {
        throw new Error('This method must be overridden');
    };

    onSelectedAnswer = () => {
        throw new Error('This method must be overridden');
    };

    onGameFinished() {
        throw new Error('This method must be overridden');
    }

    destroy() {
        bus.off(events.START_GAME,  this.onGameStarted);
        bus.off(events.FINISH_GAME, this.onGameFinished);
        bus.off(events.SELECTED_CELL,   this.onSelectedCell);
        bus.off(events.SELECTED_ANSWER, this.onSelectedAnswer);
        bus.off(`success:${events.GET_PACK}-`, this.onGetPacks);
        bus.off(`success:${events.GET_USER}-${user.nickname}`, this.getMe);
    }
}
