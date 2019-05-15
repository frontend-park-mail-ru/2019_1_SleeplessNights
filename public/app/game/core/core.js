import { events } from './events.js';
import { gameConsts } from '../../modules/constants.js';
import idb from '../../modules/indexdb.js';
import bus from '../../modules/bus.js'

export class GameCore {
    constructor() {
        this.me = {
            nickname: user.nickname,
            lastMove: null
        };
        this.gameMatrix = [];
        this.packs = [];
        this.prizes = [];
        this.opponent = null;
        this.cellCount = gameConsts.CELL_COUNT;
        this.colors = gameConsts.THEME_COLORS.map(c => { return {color: c} });
    }

    start() {
        this.onGetCells = this.onGetCells.bind(this);
        bus.on(events.FINISH_GAME,   this.onGameFinished);
        bus.on(events.SELECTED_CELL, this.onSelectedCell);
        bus.on(events.SET_OPPONENT_PROFILE, this.onSetOpponentProfile);
        bus.on(events.PLAY_AGAIN_OR_NOT,    this.onPlayAgain);
        bus.on(events.SELECTED_ANSWER, this.onSelectedAnswer);
        bus.on(events.GET_CELLS,       this.onGetCells);
        bus.on(`success:${events.GET_PACK}-`, this.onGetPacks);
        bus.on(`success:${events.GET_CELLS}`, this.onGetCells);

        idb.getAll('user', 'nickname', user.nickname, 1);
    }

    onSetOpponentProfile = (data) => {
        this.opponent = {
            nickname: data.nickname,
            lastMove: null
        };
    };

    onGetPacks = (data) => {
        this.packs = data;
        this.packs.forEach((pack, i) =>
            Object.assign(pack, this.colors[i])
        );

        bus.emit(events.FILL_PACK_LIST, this.packs);
    };

    onGetCells(data) {
        for (let i = 0; i < gameConsts.CELL_COUNT; i++) {
            for (let j = 0; j < gameConsts.CELL_COUNT; j++) {
                if (
                    (i === gameConsts.PRIZE_INDEXES[0].x && j === gameConsts.PRIZE_INDEXES[0].y) ||
                    (i === gameConsts.PRIZE_INDEXES[1].x && j === gameConsts.PRIZE_INDEXES[1].y) ||
                    (i === gameConsts.PRIZE_INDEXES[2].x && j === gameConsts.PRIZE_INDEXES[2].y) ||
                    (i === gameConsts.PRIZE_INDEXES[3].x && j === gameConsts.PRIZE_INDEXES[3].y)
                ) {
                    this.gameMatrix.push({
                        type: 'prize',
                        color: gameConsts.PRIZE_COLOR
                    });
                } else {
                    this.gameMatrix.push({
                        type: 'question'
                    });
                }
            }
        }

        let c = 0;
        this.gameMatrix.forEach((cell, i) => {
            if (cell.type === 'question') {
                const pack = this.packs.findIndex(p => p.id === data[c]);
                c++;
                Object.assign(cell, this.packs[pack]);
            } else {
                Object.assign(cell, { iconPath: '#' });
                this.prizes.push(i);
            }
        });
    }

    onPlayAgain = () => {
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

    onGameFinished = () => {
        throw new Error('This method must be overridden');
    };

    destroy() {
        bus.off(events.FINISH_GAME, this.onGameFinished);
        bus.off(events.SET_OPPONENT_PROFILE, this.onSetOpponentProfile);
        bus.off(events.PLAY_AGAIN_OR_NOT,    this.onPlayAgain);
        bus.off(events.SELECTED_CELL,   this.onSelectedCell);
        bus.off(events.SELECTED_ANSWER, this.onSelectedAnswer);
        bus.off(events.GET_CELLS,       this.onGetCells);
        bus.off(`success:${events.GET_PACK}-`, this.onGetPacks);
        bus.off(`success:${events.GET_CELLS}`,  this.onGetCells);
    }
}
