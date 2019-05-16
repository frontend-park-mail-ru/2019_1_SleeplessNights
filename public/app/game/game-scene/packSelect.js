import { AvatarComponent } from '../../components/avatar/avatar.js';
import { TimerComponent }  from '../../components/timer/timer.js';
import { CellComponent }   from '../../components/gameBoard/cell/cell.js';
import { ContainerComponent } from '../../components/container/container.js';
import { GameBoardComponent } from '../../components/gameBoard/gameBoard.js';
import { PackSectionComponent } from '../../components/pack/pack.js';
import { SelectAnswerScene }    from './selectAnswer.js';
import { EndGameScene } from './endGame.js';
import { GameScene }    from './index.js';
import { events }       from '../core/events.js';
import { gameConsts }   from '../../modules/constants.js';
import { modes } from '../modes.js';
import bus from '../../modules/bus.js';

export class PackSelectScene extends GameScene {
    constructor(root, mode) {
        super(root);
        this.cells = [];
        this.mode = mode === modes.SINGLE_PLAYER ? '1' : '2';
        this.bgColor = `var(--primary-color${this.mode})`;

        this.packs = [
            {name: "История", iconPath: "/assets/img/packs/history.svg", id: 1, color: "#B3B156", icon: ``},
            {name: "Математика", iconPath: "/assets/img/packs/math.svg", id: 2, color: "#80A352", icon: ``},
            {name: "География", iconPath: "/assets/img/packs/geography.svg", id: 3, color: "#ADE0FF", icon: ``},
            {name: "Спорт", iconPath: "/assets/img/packs/sport.svg", id: 4, color: "#FFB454", icon: ``},
            {name: "Английский язык", iconPath: "/assets/img/packs/english.svg", id: 5, color: "#63bCC7", icon: ``},
            {name: "Информатика", iconPath: "/assets/img/packs/informatics.svg", id: 6, color: "#CC6264", icon: ``}
        ];
        this.render();
    }

    render() {

        this.avatarMe = new AvatarComponent({ customClasses: 'avatar_game-board' });
        const leftContainer = new ContainerComponent({
            customClasses: 'w25 align-items-center justify-content-center container_column',
            content: `
                ${this.avatarMe.template}
                <h3 class='container_theme-primary${this.mode}'>${user.nickname}</h3>
            `
        });

        this.avatarOpponent = new AvatarComponent({ customClasses: 'avatar_game-board' });
        const rightContainer = new ContainerComponent({
            customClasses: 'w25 align-items-center justify-content-center container_column',
            content: `
                ${this.avatarOpponent.template}
                <h3 id='opponentName' class='container_theme-primary${this.mode}'>Opponent</h3>        
            `
        });

        for (let i = 0; i < 12; i++) {
            const newCell = new CellComponent({
                customClasses: 'pack__cell justify-content-center align-items-center container_column',
                bgColor: 'var(--primary-color2)'
            });
            this.cells.push(newCell);
        }
        this.gameBoard = new GameBoardComponent(this.cells.map(cell => cell.template));

        const centreContainer = new ContainerComponent({
            customClasses: 'w50 align-items-center justify-content-center',
            content:        this.gameBoard.template
        });

        this.root.insertAdjacentHTML('beforeend', `
                ${leftContainer.template}
                ${centreContainer.template}
                ${rightContainer.template}
            `);

        this.root.style.background = `linear-gradient(94deg, ${this.bgColor} 24.9%, #fff 25%, #fff 74.9%, ${this.bgColor} 75%)`;
        this.fillCells(this.packs);
    }

    fillCells = (data) => {
        const count = data.length;
        if (!count) return;
        let i = 0;

        const timer = setInterval(() => {
            const d = data[i];
            if (!this.cells[i]) return;
            const cell = this.cells[i].innerElem;

            cell.dataset.type = d.type;
            cell.style.backgroundColor = d.color;
            this.cells[i].icon = d.iconPath;
            cell.dataset.id = i;

            if (++i >= count) clearInterval(timer);
        }, 10);
    };

    onChangePlayer = (pl) => {
        const cond = pl === 'me';
        this.currentPlayer = pl;
    };

    destroy() {
        super.destroy();
    }
}
