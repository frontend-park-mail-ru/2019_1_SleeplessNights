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
        const answers = question.answers;
        const rndAnswer = this.getRandomArrayIndex(answers.length);

        setTimeout(() => {
            bus.emit('selected-answer', rndAnswer);
            bus.off('success:get-available-cells', this.botChoosingCell);
            bus.off('selected-question', this.botChoosingQuestion);
        }, this.randomTime * 1000);
    };

    botChoosingCell = (availableCells) => {
        setTimeout(() => {
            const rndCell = availableCells[this.getRandomArrayIndex(availableCells.length)];

            bus.on('selected-question', this.botChoosingQuestion);
            bus.emit('selected-cell', rndCell);
        }, this.randomTime * 1000);
    };
}
