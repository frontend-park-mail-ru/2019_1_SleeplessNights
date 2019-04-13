import { events} from './events.js';

export class GameCore {
    constructor() {
        this.CELL_COUNT = 8;
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

        this.onGameStarted = this.onGameStarted.bind(this);
        this.onGameFinished = this.onGameFinished.bind(this);
        this.onFillPacksList = this.onFillPacksList.bind(this);
        this.onSelectedCell = this.onSelectedCell.bind(this);

        bus.on('fill-pack-list', this.onFillPacksList);
        bus.on('selected-cell', this.onSelectedCell);
    }

    start() {
        bus.on(events.START_GAME, this.onGameStarted);
        bus.on(events.FINISH_GAME, this.onGameFinished);
    }

    onGameStarted(evt) {
        throw new Error('This method must be overridden');
    }

    onGameFinished(evt) {
        throw new Error('This method must be overridden');
    }

    onFillPacksList(evt) {
        throw new Error('This method must be overridden');
    }

    onSelectedCell(evt) {
        throw new Error('This method must be overridden');
    }

    destroy() {
        bus.off(events.START_GAME, this.onGameStarted);
        bus.off(events.FINISH_GAME, this.onGameFinished);
    }
}
