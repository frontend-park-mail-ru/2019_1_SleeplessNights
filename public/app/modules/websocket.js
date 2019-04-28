export class IWebSocket {
    constructor(url) {
        this.socket = new WebSocket(url);
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
            bus.emit('ws-message', JSON.parse(msg.data));
        };
    }
}
