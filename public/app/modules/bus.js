class Bus {
    constructor () {
        this.listeners = {};
    }

    on (event, callback) {    // подписываемся на событие
        this.listeners[ event ] = this.listeners[ event ] || [];
        this.listeners[ event ].push(callback);
        return this;
    }

    off (event, callback) {   // отписываемся от события
        this.listeners[ event ] = this.listeners[ event ]
            .filter(function (listener) {
                return listener !== callback;
            });
    }

    emit (event, data) {      // публикуем (диспатчим, эмитим) событие
        this.listeners[ event ].forEach(function (listener) {
            listener(data);
        });
        return this;
    }
}

export default new Bus();
