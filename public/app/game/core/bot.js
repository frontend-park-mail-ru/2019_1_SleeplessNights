const fieldSize = 8;

export class BotPlayer {
    constructor() {
        this.waitingTime = {
            min: 3, //second
            max: 6 //second
        };

        bus.on('set-current-player', (pl) => {
            if (pl === 'bot')  this.startActing();
        });
    }

    startActing() {
        bus.on('success:get-available-cells', this.botChoosingCell);
        bus.emit('get-available-cells');
    }

    get randomTime() {
        return Math.floor(Math.random() * (
            this.waitingTime.max - this.waitingTime.min + 1)
        ) + this.waitingTime.max;
    }

    getRandomArrayIndex(arrayLength) {
        return Math.floor(Math.random() * arrayLength);
    }

    botChoosingQuestion = (question) => {
        const winChance = 75;//%
        const answers = question.answers;
        const r = Math.random()*100;//Получаем случайное число процентов
        let answer;
        if (r <= winChance) {
            //Победа
            answer = question.correct;//Выбираем правильный ответ
        } else {
            //Поражеие
            answers.splice(question.correct, 1);//Удаляем правильный ответ
            answer = this.getRandomArrayIndex(answers.length);//Выбираем случайный ответ из неправильных
        }

        setTimeout(() => {
            bus.emit('selected-answer', answer);//Возвращаем выбранный ответ
            bus.off('success:get-available-cells', this.botChoosingCell);
            bus.off('selected-question', this.botChoosingQuestion);
        }, this.randomTime * 1000);
    };

    botChoosingCell = (availableCells) => {
        setTimeout(() => {
            const mid = fieldSize/2;
            let aim = {x: 0, y: 0};
            //Найдём тномер той ячейки, пкть из которой к центру поля будет минимальным
            const bestCeil = availableCells.reduce((accumulator, currentValue, index) => {
                //Приз занимает 4 центральных клетки
                //Выберем ближайшую клетку в формате координат
                let currentX = currentValue % fieldSize;
                let currentY = Math.floor(currentValue / fieldSize);
                aim.x = currentX <= Math.floor(mid) ? Math.floor(mid) : Math.ceil(mid);
                aim.y = currentY <= Math.floor(mid) ? Math.floor(mid) : Math.ceil(mid);
                //Найдём разницу по обеим координатам относительно текущей позиции
                let dx = Math.abs(currentX - aim.x);
                let dy = Math.abs(currentY - aim.y);
                //Найдём расстояние в ходах от текущей позиции до
                let pathLen = Math.abs(dx - dy) + Math.min(dx, dy);
                if (pathLen < accumulator.pathLen) {
                    accumulator.index = index;
                    accumulator.pathLen = pathLen;
                }
            }, {index: -1, pathLen: fieldSize});

            bus.on('selected-question', this.botChoosingQuestion);
            bus.emit('selected-cell', availableCells[bestCeil.index]);//Возвращаем клетку с кратчайшим путём до цели
        }, this.randomTime * 1000);
    };
}
