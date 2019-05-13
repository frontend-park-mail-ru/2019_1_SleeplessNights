import bus from './bus.js';

export class IWebSocket {
    constructor(url, type) {
        this.url = url;
        this.type = type;
        this.socket = new WebSocket(this.url);
        this.socket.onopen = this.onOpen;
        this.socket.onerror = this.onError;
        this.socket.onclose = this.onClose;
    }

    onOpen = () => {
        console.log('Websocket successfully connected');
        this.startListening();
    };

    onError = (event) => {
        console.log(`Websocket failed trying to connect ${this.url}`);
        console.log(event);
    };

    onClose() {
        console.log('Websocket successfully disconnected');
    };

    sendMessage(type, payload) {
        this.socket.send(type, payload);
    }

    startListening() {
        this.socket.onmessage = (msg) => {
            bus.emit(`${this.type}:ws-message`, JSON.parse(msg.data));
        };
    }

    close() {
        this.socket.close();
    }
}
