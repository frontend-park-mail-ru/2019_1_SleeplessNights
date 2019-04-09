class IWebSocket {
    constructor() {
        this.socket = new WebSocket('');
        this.socket.onopen = () => {
            console.log('Websocket successfully connected');
            this.startListening();
        };
    }

    sendMessage (message) {
        this.socket.send(message);
    }

    startListening () {
        this.socket.onmessage = (msg) => {
            bus.emit('ws-message', msg);
        }
    }
}

export default new IWebSocket();
