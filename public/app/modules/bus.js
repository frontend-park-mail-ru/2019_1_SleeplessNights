class Bus {
    constructor () {
        this.listeners = {};
        this.i = 0;
    }

    on (event, callback) {    // подписываемся на событие
        // console.log('on', event,  ++this.i);
        this.listeners[ event ] = this.listeners[ event ] || [];
        this.listeners[ event ].push(callback);
        return this;
    }

    off (event, callback) {
        // console.log('off', event, --this.i);
        this.listeners[ event ] = this.listeners[ event ]
            .filter(listener => listener !== callback);
    }

    emit (event, data) {      // публикуем (диспатчим, эмитим) событие
        // console.log('emit', event);
        this.listeners[ event ].forEach(listener => listener(data));
        return this;
    }
}

export default new Bus();
