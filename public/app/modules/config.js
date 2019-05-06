export class Config {
    constructor(mode) {
        this.mode = mode;
        this.urls = {
            'dev': {
                'backend': 'http://localhost:8080',
                'chat': 'ws://localhost:8005/chat/connect',
                'game': 'ws://localhost:8005/game/connect'
            },
            'prod': {
                'backend': 'http://89.208.198.186:8080',
                'chat': 'ws://89.208.198.186:8005/chat/connect',
                'game': 'ws://localhost:8005/game/connect'
            }
        };
    }

    get backendUrl() {
        return this.urls[this.mode].backend;
    }

    get chatUrl() {
        return this.urls[this.mode].chat;
    }

    get gameUrl() {
        return this.urls[this.mode].game;
    }
}

export default new Config('dev');