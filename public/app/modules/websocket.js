import bus from './bus.js';

export class IWebSocket {
    constructor(url, type) {
        this.socket = new WebSocket(url);
        this.type = type;
        this.socket.onopen = () => {
            console.log('Websocket successfully connected');
            this.startListening();
        };
    }

    sendMessage(type, payload) {
        this.socket.send(type, payload);
    }

    startListening() {
        this.socket.onmessage = (msg) => {
            bus.emit(`${this.type}:ws-message`, JSON.parse(msg.data));
        };
    }
}
