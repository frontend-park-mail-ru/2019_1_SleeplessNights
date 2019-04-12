export class IWebSocket {
    constructor() {
        this.socket = new WebSocket('');
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
            bus.emit('ws-message', msg);
        }
    }
}
