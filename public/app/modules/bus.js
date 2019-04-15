class Bus {
    constructor () {
        this.listeners = {};
        this.i = 0;
    }

    on (event, callback) {
        this.listeners[ event ] = this.listeners[ event ] || [];
        this.listeners[ event ].push(callback);
        return this;
    }

    off (event, callback) {
        this.listeners[ event ] = this.listeners[ event ]
            .filter(listener => listener !== callback);
    }

    emit (event, data) {
        this.listeners[ event ].forEach(listener => listener(data));
        return this;
    }
}

export default new Bus();
