import idb from '../modules/indexdb.js';
import { TestDataDB } from './testDataDB.js';
import bus from '../modules/bus.js';

export class GameService {
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
