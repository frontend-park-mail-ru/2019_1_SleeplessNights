import { IWebSocket } from '../modules/websocket.js';
import config from '../modules/config.js';
import bus from '../modules/bus.js';

export class ChatService {
    constructor() {
        this.ws = new IWebSocket(config.chatUrl, 'chat');
        bus.on('chat:ws-failed', console.log('WS Chat Failed'));
        bus.on('chat:ws-message', this.getMessage);
        bus.on('chat:close-connection', this.closeConnection);
        setTimeout(() => {
            this.getOldMessages();
        }, 1000);
    }

    closeConnection = () => {
        this.ws.close();
        bus.off('chat:close-connection', this.closeConnection);
        bus.off(`chat:ws-message`, this.getMessage);
    };

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

    getMessage = (message) => {
        if (message.length) {
            message.forEach(m => bus.emit('chat:get-message', m));
        } else {
            bus.emit('chat:get-message', message);
        }
    };
}
