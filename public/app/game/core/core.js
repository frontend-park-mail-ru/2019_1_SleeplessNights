import { events} from './events.js';
import { ModalComponent } from '../../components/modal/modal.js';

export class GameCore {
    constructor(root) {
        this.root = root;
        this.packs = [];
        this.questions = [];
        this.CELL_COUNT = 8;
        this.GAME_MATRIX = [];
        this.onGameStarted = this.onGameStarted.bind(this);
        this.onGameFinished = this.onGameFinished.bind(this);

        bus.on('fill-pack-list', packs => {
            this.packs = packs;
            const questions = [];

            this.packs.forEach((pack, i) => {
                idb.getAll('question', 'packId', pack.id, 10);
                bus.on(`success:get-question-packId-${pack.id}`, (data) => {
                    questions.push(data);

                    if (i === this.packs.length - 1) {
                        bus.emit('questions-ready', questions);
                    }
                });
            });
        });

        bus.on('questions-ready', (questions) => {
            for (let j = 0; j < 10; j++) {
                for (let i = 0; i < this.packs.length; i++) {
                    this.questions.push(questions[i][j]);
                }
            }
        });
    }

    start() {
        bus.on(events.START_GAME, this.onGameStarted);
        bus.on(events.FINISH_GAME, this.onGameFinished);

        idb.getAll('pack', null, null, 6);
        bus.on('success:get-pack-id-', (data) => {
            const packs = data;
            const colors = [
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

            packs.forEach((pack, i) =>
                Object.assign(pack, colors[i])
            );

            bus.emit('fill-pack-list', packs);

            for (let i = 0; i < this.CELL_COUNT; i++) {
                for (let j = 0; j < this.CELL_COUNT; j++) {
                    if ((i === 3 && j === 3) || (i === 3 && j === 4) ||
                        (i === 4 && j === 3) || (i === 4 && j === 4)) {
                        this.GAME_MATRIX.push({
                            type: 'prize',
                            color: '#0c5460'
                        });
                    } else {
                        this.GAME_MATRIX.push({
                            type: 'question'
                        });
                    }
                }
            }

            const packsCount = packs.length;
            let p = 0;
            this.GAME_MATRIX.forEach(cell => {
                if (cell.type === 'question') {
                    Object.assign(cell, packs[p]);
                    p = (p + 1) % packsCount;
                }
            });

            bus.emit('fill-cells', this.GAME_MATRIX);
            this.onSelectPack();
        });
    }

    onGameStarted(evt) {
        throw new Error('This method must be overridden');
    }

    onGameFinished(evt) {
        throw new Error('This method must be overridden');
    }

    onSelectPack() {
        bus.on('selected-cell', (cellIndex) => {
            const modal = new ModalComponent({
                customClasses: 'modal_w-400',
                body: JSON.stringify(this.questions[cellIndex])
            });

            this.root.insertAdjacentHTML('beforeend', modal.template);
            modal.show();
        });
    }

    destroy() {
        bus.off(events.START_GAME, this.onGameStarted);
        bus.off(events.FINISH_GAME, this.onGameFinished);
    }
}
