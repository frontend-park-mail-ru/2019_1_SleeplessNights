import { modes } from './modes.js';
import { SinglePlayer } from './core/single_player.js';
import { MultiPlayer }  from './core/multi_player.js';
import { GameCore }     from './core/core.js';

export class Game {
    constructor ({
        mode = ''
    } = {}) {
        this.CELL_COUNT = 8;
        let GameConstructor = null;

        switch (mode) {
            case modes.SINGLE_PLAYER:
                GameConstructor = SinglePlayer;
                break;
            case modes.MULTI_PLAYER:
                GameConstructor = MultiPlayer;
                break;
            default:
                throw new Error(`Invalid game mode ${mode}`);
        }

        this.gameConstructor = new GameConstructor();
        this.gameCore = new GameCore();
    }

    start () {
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
    }

    destroy () {

    }
}
