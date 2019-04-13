import { GameScene } from './index.js';
import { SelectAnswerScene } from './selectAnswer.js';
import { AvatarComponent }   from '../../components/avatar/avatar.js';
import { ListComponent } from '../../components/list/list.js';
import { CellComponent } from '../../components/gameBoardCell/cell.js';
import { CardComponent } from '../../components/card/card.js';
import { ContainerComponent } from '../../components/_new/container/container.js';
import { GameBoardComponent } from '../../components/gameBoard/gameBoard.js';

export class PlayingScene extends GameScene {
    constructor(root) {
        super();
        this.root = root;
        new SelectAnswerScene(root);
        bus.on('fill-pack-list', (data) => this._updatePackList(data));

        this._packsSection = document.createElement('section');
        this._packsSection.className = 'packs-section';
        this._render();
    }

    get packsSection() {
        return this._packsSection.outerHTML;
    }

    set packsSection(data) {
        const ps = document.getElementsByClassName('packs-section')[0];
        ps.innerHTML = data;
    }

    _render() {
        const avatar1 = new AvatarComponent({ customClasses: 'avatar_game-board' });
        const leftContainer = new ContainerComponent({
            customClasses: 'container__col-w25',
            content: `${avatar1.template} ${this.packsSection}`
        });

        const avatar2 = new AvatarComponent({ customClasses: 'avatar_game-board' });
        const rightContainer = new ContainerComponent({
            customClasses: 'container__col-w25',
            content: avatar2.template
        });

        const gameBoard = new GameBoardComponent();
        const centreContainer = new ContainerComponent({
            customClasses: 'container__col-w50',
            content: gameBoard.template
        });

        this.root.insertAdjacentHTML('beforeend', `
                ${leftContainer.template}
                ${centreContainer.template}
                ${rightContainer.template}
            `);

        this.root.style.background = 'linear-gradient(180deg, #ffffff 50%, #f3f3f3 50%)';
    }

    _updatePackList(packs) {
        const _list = [];
        packs.forEach(pack => {
            const cell = new CellComponent({
                customClasses: 'game-board__cell_pack d_inline-block',
                bgColor: pack.color,
                type: 'pack-description'
            });

            _list.push({
                customClasses: '',
                text: `${cell.template} <span class="pack-name d_inline-block">${pack.name}</span>`
            })
        });

        const list = new ListComponent({ list: _list });
        const card = new CardComponent({
            customClasses: 'card_pack shadow-l',
            body: list.template
        });

        this.packsSection = card.template;
    }
}
