class Bus {
    constructor () {
        this.listeners = {};
    }

    on(event, callback) {
        this.listeners[ event ] = this.listeners[ event ] || [];
        this.listeners[ event ].push(callback);
        return this;
    }

    off(event, callback) {
        if (this.listeners[ event ]) {
            this.listeners[ event ] = this.listeners[ event ]
                .filter(listener => listener !== callback);
        } else {
            console.error(`Bus off: there is no subscribed such event: ${event}`);
        }
    }

    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(listener => listener(data));
        } else {
            console.error(`Bus emit: there is no subscribed such event: ${event}`);
        }
        return this;
    }
}

export default new Bus();
