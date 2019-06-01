import { GopherComponent } from '../../components/gopher/gopher.js';
import { events } from '../core/events.js';
import bus from '../../modules/bus.js';

export class Gopher {
    constructor(root) {
        this.root = root;
        this.currentPlayer = null;
        this.gopher = null;
        this.packs = null;

        bus.on(events.BOT_CHOOSING_PACK, this.onBotChoosingPack);
        bus.on(events.BOT_SELECTED_PACK, this.onBotSelectedPack);
        bus.on(`success:${events.GET_AVAILABLE_CELLS}`, this.botChoosingCell);
        bus.on(events.BOT_SELECTED_CELL, this.onBotSelectedCell);
        bus.on(events.SELECTED_QUESTION,  this.botChoosingQuestion);
        bus.on(events.BOT_SELECTED_ANSWER, this.onBotSelectedAnswer);
        bus.on(events.SET_CURRENT_PLAYER, this.onChangePlayer);

        this.render();
    }

    onChangePlayer = (pl) => this.currentPlayer = pl;

    botChoosingCell = () => {
        if (this.currentPlayer === 'bot') {
            this.gopher.think(`Хммм что же выбрать ?! Сложный выбор...`, true, 65);
        }
    };

    onBotSelectedCell = (cell) => {
        this.gopher.say(`Лучше выбрать ${cell.name}`, true, 50);
        setTimeout(() => {
            bus.emit(events.SELECTED_CELL, cell.id);
        }, 1500);
    };

    onBotChoosingPack = (data) => {
        this.packs = data;
        this.gopher.think(`Хммм что же выбрать ?! Сложный выбор...`, true, 65);
    };

    onBotSelectedPack = (id) => {
        bus.emit(events.STOP_TIMEOUT_PACK);
        this.gopher.say(`А давайка выбрать ${this.packs[id].name}`, true, 50);
        setTimeout(() => {
            bus.emit(events.SELECTED_PACK, this.packs[id].index);
        }, 1500)
    };

    botChoosingQuestion = (data) => {
        this.currentQuestion = data;
        if (this.currentPlayer === 'bot') {
            this.gopher.say(`😀 Везде надо думать`);
        }
    };

    onBotSelectedAnswer = (id) => {
        this.gopher.say(`По моему правильный ответь это ${this.currentQuestion.answers[id]}`, true, 25);
        setTimeout(() => {
            bus.emit(events.SELECTED_ANSWER, id);
        }, 1100)
    };

    render() {
        this.root.hideIcon();
        this.gopher = new GopherComponent();
        this.root.insertAdjacentHTML(this.gopher.template);
        this.gopher.startActing();
    }

    destroy() {
        this.gopher.destroy();
        bus.off(events.BOT_CHOOSING_PACK, this.onBotChoosingPack);
        bus.off(events.BOT_SELECTED_PACK, this.onBotSelectedPack);
        bus.off(`success:${events.GET_AVAILABLE_CELLS}`, this.botChoosingCell);
        bus.off(events.BOT_SELECTED_CELL, this.onBotSelectedCell);
        bus.off(events.SELECTED_QUESTION,  this.botChoosingQuestion);
        bus.off(events.BOT_SELECTED_ANSWER, this.onBotSelectedAnswer);
        bus.off(events.SET_CURRENT_PLAYER, this.onChangePlayer);
    }
}
