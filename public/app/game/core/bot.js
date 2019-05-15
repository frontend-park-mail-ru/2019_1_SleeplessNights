import { events }  from './events.js';
import { gameConsts, botConsts } from '../../modules/constants.js';
import bus from '../../modules/bus.js';

export class BotPlayer {
    constructor() {
        this.waitingTime = botConsts.waitingTime;
        this.winChance = botConsts.winChance;
        bus.on(events.SET_CURRENT_PLAYER, this.setCurrentPlayer);
    }

    setCurrentPlayer = (pl) => {
        pl === 'bot' ? this.startActing() : this.stopActing() ;
    };

    startActing() {
        bus.on(`success:${events.GET_AVAILABLE_CELLS}`, this.botChoosingCell);
        bus.emit(events.GET_AVAILABLE_CELLS);
    }

    stopActing() {
        clearTimeout(this.timer);
        bus.off(`success:${events.GET_AVAILABLE_CELLS}`, this.botChoosingCell);
    };

    get randomTime() {
        return Math.floor(Math.random() * (
            this.waitingTime.max - this.waitingTime.min + 1)
        ) + this.waitingTime.max;
    }

    getRandomArrayIndex(arrayLength) {
        return Math.floor(Math.random() * arrayLength);
    }

    botChoosingQuestion = (question) => {
        const answers = question.answers;
        const r = Math.random() * 100; //Получаем случайное число процентов
        let answer;
        if (r <= this.winChance) {
            answer = question.correct; // Выбираем правильный ответ
        } else {
            answers.splice(question.correct, 1); // Удаляем правильный ответ
            answer = this.getRandomArrayIndex(answers.length); // Выбираем случайный ответ из неправильных
        }

        setTimeout(() => {
            bus.emit(events.SELECTED_ANSWER, answer); // Возвращаем выбранный ответ
            bus.off(`success:${events.GET_AVAILABLE_CELLS}`, this.botChoosingCell);
            bus.off(events.SELECTED_QUESTION, this.botChoosingQuestion);
        }, this.randomTime * 1000);
    };

    botChoosingCell = (availableCells) => {
        this.timer = setTimeout(() => {
            const mid = gameConsts.CELL_COUNT / 2;
            const aim = {x: 0, y: 0};
            // Найдём номера тех ячеек, путь из которой к центру поля будет минимальным
            const bestCells = availableCells.reduce((accumulator, currentValue, index) => {
                // Приз занимает 4 центральных клетки
                // Выберем ближ     айшую клетку в формате координат
                const currentX = currentValue % gameConsts.CELL_COUNT;
                const currentY = Math.floor(currentValue / gameConsts.CELL_COUNT);
                aim.x = currentX <= Math.floor(mid) ? Math.floor(mid) : Math.ceil(mid);
                aim.y = currentY <= Math.floor(mid) ? Math.floor(mid) : Math.ceil(mid);
                // Найдём разницу по обеим координатам относительно текущей позиции
                const dx = Math.abs(currentX - aim.x);
                const dy = Math.abs(currentY - aim.y);
                // Найдём расстояние в ходах от текущей позиции до
                const pathLen = Math.abs(dx - dy) + Math.min(dx, dy);
                if (pathLen < accumulator.pathLen) {
                    accumulator.index = [index];
                    accumulator.pathLen = pathLen;
                } else if (pathLen === accumulator.pathLen) {
                    accumulator.index.push(index);
                }
                return accumulator;
            }, {index: [], pathLen: gameConsts.CELL_COUNT}).index;

            const cellIndex = bestCells[this.getRandomArrayIndex(bestCells.length)];//Выбираем случайную клетку из наилучших вариантов

            bus.on(events.SELECTED_QUESTION,  this.botChoosingQuestion);
            bus.emit(events.STOP_TIMEOUT);
            bus.emit(events.SELECTED_CELL, availableCells[cellIndex]); // Возвращаем клетку с кратчайшим путём до цели
        }, this.randomTime * 1000);
    };

    destroy() {
        bus.off(events.SET_CURRENT_PLAYER, this.setCurrentPlayer);
        bus.off(`success:${events.GET_AVAILABLE_CELLS}`, this.botChoosingCell);
        bus.off(events.SELECTED_QUESTION, this.botChoosingQuestion);
    }
}
