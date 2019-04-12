import { events} from './events.js';
import { ModalComponent } from '../../components/modal/modal.js';

export class GameCore {
    constructor(root) {
        this.root = root;
        this.CELL_COUNT = 8;
        this.onGameStarted = this.onGameStarted.bind(this);
        this.onGameFinished = this.onGameFinished.bind(this);
    }

    start() {
        bus.on(events.START_GAME, this.onGameStarted);
        bus.on(events.FINISH_GAME, this.onGameFinished);

        const packs = [
            {
                name: 'Math',
                color: '#B3B156'
            },
            {
                name: 'Chemist',
                color: '#FFFD94'
            },
            {
                name: 'Physic',
                color: '#ADE0FF'
            },
            {
                name: 'Programming',
                color: '#FFB454'
            },
            {
                name: 'History',
                color:'#00FFC5',
            },
            {
                name: 'Law',
                color: '#CC6264',
            }
        ];

        bus.emit('fill-pack-list', packs);

        const gameMatrix = [];
        for (let i = 0; i < this.CELL_COUNT; i++) {
            for (let j = 0; j < this.CELL_COUNT; j++) {
                if ((i === 3 && j === 3) || (i === 3 && j === 4) ||
                    (i === 4 && j === 3) || (i === 4 && j === 4)) {
                    gameMatrix.push({
                        type: 'prize',
                        color: '#0c5460'
                    });
                } else {
                    gameMatrix.push({
                        type: 'question'
                    });
                }
            }
        }

        const packsCount = packs.length;
        let p = 0;
        gameMatrix.forEach(cell => {
            if (cell.type === 'question') {
                Object.assign(cell, packs[p]);
                p = (p + 1) % packsCount
            }
        });

        bus.emit('fill-cells', gameMatrix);
        bus.on('selected-cell', (data) => {
            const modal = new ModalComponent({
                body: data
            });

            this.root.insertAdjacentHTML('beforeend', modal.template);
            modal.show();
        });
    }

    onGameStarted(evt) {
        throw new Error('This method must be overridden');
    }

    onGameFinished(evt) {
        throw new Error('This method must be overridden');
    }

    destroy() {
        bus.off(events.START_GAME, this.onGameStarted);
        bus.off(events.FINISH_GAME, this.onGameFinished);
    }
}
