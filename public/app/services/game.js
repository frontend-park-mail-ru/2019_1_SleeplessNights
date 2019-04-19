import idb from '../modules/indexdb.js';

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
        const waiter = setInterval(sendQuery, 1000);
    }

    static fillTestDB() {
        const packs = [
            {
                name: 'История'
            },
            {
                name: 'Математика'
            },
            {
                name: 'Химия'
            },
            {
                name: 'Физика'
            },
            {
                name: 'Английский язык'
            },
            {
                name: 'Информатика'
            }
        ];
        const questions = [
            {
                text: 'Кто из президентов США написал свой собственный рассказ про Шерлока Холмса?',
                answers: ['Джон Кеннеди', 'Франклин Рузвельт', 'Рональд Рейган', 'Дональд Трамп'],
                correct: 1
            },
            {
                text: 'Какую пошлину ввели в XII  веке в Англии для того чтобы заставить мужчин пойти на войну?',
                answers: [
                    'Налог на тунеядство',
                    'Налог на трусость',
                    'Налог на отсутствие сапог',
                    'Налог на отсутствие мужество'
                ],
                correct: 1
            },
            {
                text: 'Откуда пошло выражение «деньги не пахнут?',
                answers: [
                    'От подателей за провоз парфюмерии',
                    'От сборов за нестиранные носки',
                    'От налога на туалеты',
                    'Не знаю'
                ],
                correct: 2
            },
            {
                text: 'В какую из этих игр играют не клюшкой?',
                answers: [
                    'Бильярд',
                    'Хоккей',
                    'Поло',
                    'Гольф'
                ],
                correct: 0
            },
            {
                text: 'В каком городе не работал великий композитор 18-го века Кристоф Виллибальд Глюк?',
                answers: [
                    'Милан',
                    'Вена',
                    'Париж',
                    'Берлин'
                ],
                correct: 3
            },
            {
                text: 'В каком городе жил и работал К. Э. Циолковский?',
                answers: [
                    'Москва',
                    'Санкт-Петербург',
                    'Калуга',
                    'Томск'
                ],
                correct: 2
            },
            {
                text: 'В каком городе США провёл детство великий аргентинский композитор Астор Пьяццолла?',
                answers: [
                    'Чикаго',
                    'Вашангтон',
                    'Нью-Йорк',
                    'Аляьска'
                ],
                correct: 2
            },
            {
                text: 'Где в основном проживают таты?',
                answers: [
                    'Татарстан',
                    'Дагестан',
                    'Башкортостан',
                    'Туркменистан'
                ],
                correct: 1
            },
            {
                text: 'С какой из этих стран Чехия не граничит?',
                answers: [
                    'Германия',
                    'Австрия',
                    'Польша',
                    'Венгрия'
                ],
                correct: 3
            },
            {
                text: 'Благодаря какому животному Шурик познакомился с Ниной в к/ф \'Кавказская пленница\'?',
                answers: [
                    'Верблюд',
                    'Осел',
                    'Конь',
                    'Ежик'
                ],
                correct: 2
            }
        ];

        idb.add('user', [{
            nickname: 'guest',
            avatar_path: '/assets/img/avatar_male.png'
        }]);

        idb.add('pack', packs);
        idb.getAll('pack', null, null, 6);

        bus.on('success:get-pack-id-', (data) => {
            data.forEach(pack => {
                const _questions = questions.map(q => {
                    return {
                        text: q.text,
                        answers: [...q.answers],
                        correct: q.correct,
                        packId: pack.id
                    };
                });
                idb.add('question', _questions);
            });
        });
    }
}
