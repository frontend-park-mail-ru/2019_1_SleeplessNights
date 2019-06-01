import { IWebSocket } from '../modules/websocket.js';
import config from '../modules/config.js';
import bus from '../modules/bus.js';

export class ChatService {
    constructor() {
        this.ws = new IWebSocket(config.chatUrl);
        this.getMessage();
        setTimeout(() => {
            this.getOldMessages();
        }, 1000);
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

    getOldMessages() {
        const message = {
            title: 'SCROLL',
            payload: {
                since: 100
            }
        };

        this.ws.sendMessage(JSON.stringify(message));
    }

    getMessage() {
        bus.on('ws-message', (message) => {
            bus.emit('chat:get-message', message);
        });
    }
}
