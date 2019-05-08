import { TestDataDB } from './testDataDB.js';
import { IWebSocket } from '../modules/websocket.js';
import { inMessages } from '../game/constants.js';
import { makeAvatarPath } from '../modules/utils.js';
import bus from '../modules/bus.js';
import idb from '../modules/indexdb.js';
import config from '../modules/config.js';

export class GameService {
    constructor() {
        this.ws = new IWebSocket(config.gameUrl, 'game');
        this.receiveMessages();
    }

    sendMessage = ({ title, payload }) => {
        const message = {
            title: title,
            payload: payload
        };

        this.ws.sendMessage(JSON.stringify(message));
    };

    receiveMessages() {
        bus.on('game:ws-message', (message) => {
            console.log(message);
            switch (message.title) {
                case "INFO": {
                    bus.emit('success:start-game-multiplayer');
                } break;

                case inMessages.opponentProfile: {
                    const profile = message.payload;
                    profile.avatarPath = makeAvatarPath(profile.avatarPath);
                    bus.emit('set-opponent-profile', profile);
                } break;

                case inMessages.themesRequest: {
                    bus.emit('success:get-pack-id-', message.payload);
                } break;

                case inMessages.questionThemesRequest: {
                    bus.emit('success:get-cells', message.payload);
                } break;

                case inMessages.availableCells: {
                    const arr = message.payload;
                    arr.forEach((a, i) =>
                        arr[i] = a.y * 8 + a.x
                    );

                    bus.emit('success:get-available-cells', arr);
                } break;

                case inMessages.yourQuestion: {
                    const question = message.payload;
                    // question.question = JSON.parse(question.question);
                    console.log(question.question);
                    bus.emit('selected-question', question.question);
                } break;

                default: {
                    console.log(message.title, message.payload || '')
                }
            }
        });
    }


    static checkDB() {
        let waiterCount = 0;
        const waitDB = (data) => {
            if (data.length) {
                bus.emit('success:check-indexedDB');
                clearInterval(waiter);
                for (let i = 0; i < waiterCount; i++) {
                    bus.off(`success:get-user-nickname-${user.nickname}`, waitDB);
                }
            }
        };

        const sendQuery = () => {
            waiterCount++;
            idb.getAll('user', 'nickname', user.nickname, 1);
            // idb.getAll('pack', null, null, 6);
            bus.on(`success:get-user-nickname-${user.nickname}`, waitDB);
        };

        sendQuery();
        const waiter = setInterval(sendQuery, 250);
    }

    static fillTestDB() {
        idb.add('user', TestDataDB.guest);
        idb.add('pack', TestDataDB.packs);

        idb.getAll('pack', null, null, 6);
        const questions = TestDataDB.questions;
        const fillQuestions = (data) => {
            data.forEach((pack, i) => {
                const _questions = questions.slice(i * 10, i * 10 + 10).map(q => {
                    return {
                        text: q.text,
                        answers: [...q.answers],
                        correct: q.correct,
                        packId: pack.id
                    };
                });

                idb.add('question', _questions);
                if (i === data.length - 1) {
                    bus.off('success:get-pack-id-', fillQuestions);
                }
            });
        };

        bus.on('success:get-pack-id-', fillQuestions);
    }
}
