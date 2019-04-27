import { IWebSocket } from "../modules/websocket.js";

export class ChatService {
    constructor() {
        this.host = 'ws://89.208.198.186:8005/chat/connect';
        this.ws = new IWebSocket(this.host);
        this.getMessage();
    }

    sendMessage = (text) => {
        const message = {
            title: 'POST',
            payload: {
                text: text
            }
        };

        this.ws.sendMessage(JSON.stringify(message));
    };

    getMessage() {
        bus.on('ws-message', (message) => {
            console.log(message);
            const msg = JSON.parse(message.data);
            if (msg.title === 'INFO') {
                bus.emit('chat:get-message', JSON.parse(msg.payload));
            }
        });
    }
}
