import { TestDataDB } from './testDataDB.js';
import { IWebSocket } from '../modules/websocket.js';
import { inMessages } from '../game/constants.js';
import { events }     from '../game/core/events.js';
import { makeAvatarPath } from '../modules/utils.js';
import bus from '../modules/bus.js';
import idb from '../modules/indexdb.js';
import config from '../modules/config.js';

export class GameService {
    constructor() {
        this.type = 'game';
        this.ws = new IWebSocket(config.gameUrl, this.type);
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
        bus.on(`${this.type}:ws-message`, (message) => {
            switch (message.title) {
                case inMessages.CONNECTED: {
                    bus.emit('success:start-game-multiplayer');
                } break;

                case inMessages.OPPONENT_PROFILE: {
                    const profile = message.payload;
                    profile.avatarPath = makeAvatarPath(profile.avatarPath);
                    bus.emit(events.SET_OPPONENT_PROFILE, profile);
                } break;

                case inMessages.THEMES: {
                    bus.emit(`success:${events.GET_PACK}-`, message.payload);
                } break;

                case inMessages.QUESTION_THEMES: {
                    bus.emit(`success:${events.GET_CELLS}`, message.payload);
                } break;

                case inMessages.AVAILABLE_CELLS: {
                    const arr = message.payload;
                    arr.forEach((a, i) => arr[i] = a.y * 8 + a.x );
                    setTimeout(() =>
                        bus.emit(`success:${events.GET_AVAILABLE_CELLS}`, arr), 1000
                    );
                } break;

                case inMessages.OPPONENT_QUESTION:
                case inMessages.YOUR_QUESTION: {
                    bus.emit(events.SELECTED_QUESTION, JSON.parse(message.payload));
                } break;

                case inMessages.YOUR_ANSWER:
                case inMessages.OPPONENT_ANSWER: {
                    let answer = message.payload;
                    answer = {
                        given: answer.given_answer,
                        correct: answer.correct_answer
                    };

                    bus.emit(events.SET_ANSWER_CORRECTNESS, answer);
                } break;

                case inMessages.YOUR_TURN: {
                    bus.emit(events.SET_CURRENT_PLAYER, 'me');
                } break;

                case inMessages.OPPONENT_TURN: {
                    bus.emit(events.SET_CURRENT_PLAYER, 'opponent');
                } break;

                case inMessages.SELECTED_CELL: {
                    let cell = message.payload;
                    cell = cell.y * 8 + cell.x;
                    bus.emit(events.SELECTED_CELL, cell);
                } break;

                case inMessages.WIN: {
                    bus.emit(events.END_GAME, false);
                } break;

                case inMessages.LOSS: {
                    bus.emit(events.END_GAME, true);
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
