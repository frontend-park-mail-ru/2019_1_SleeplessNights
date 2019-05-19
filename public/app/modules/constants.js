// Входящие сообщении по веь-сокету дял игры
export const inMessages = {
    CONNECTED          : 'CONNECTED',           // Оповещаем клиентов о том, что успешно подключалься по ws
    START_GAME         : 'START_GAME',          // Оповещаем клиентов о том, что комната готова и они могут начать её отрисовывать
    YOUR_TURN          : 'YOUR_TURN',           // Оповещаем клиента о начале его хода
    OPPONENT_TURN      : 'OPPONENT_TURN',       // Оповещаемк клиента о том, что ходит его оппонент
    AVAILABLE_CELLS    : 'AVAILABLE_CELLS',     // Оповещаем клиента о том, на какие клетки он может ходить; payload = []pair
    YOUR_QUESTION      : 'QUESTION',            // Даём клиенту вопрос, связанный с клеткой; payload = question
    OPPONENT_QUESTION  : 'OPPONENT_QUESTION',   // Даём клиенту вопрос, связанный с клеткой; payload = question
    YOUR_ANSWER        : 'YOUR_ANSWER',         // Оповещаем обоих клиентов о том, что какой ответ был выбран а какой был правильный
    OPPONENT_ANSWER    : 'OPPONENT_ANSWER',     // Оповещаем клиента об ответе, который дал его оппонент; payload = int
    LOSS               : 'LOSS',                // Оповещаем клиента о его поражении
    WIN                : 'WIN',                 // Оповещаем клиента о его победе
    OPPONENT_PROFILE   : 'OPPONENT_PROFILE',    // Данные оппонента
    WANNA_PLAY_AGAIN   : 'WANNA_PLAY_AGAIN',    // Даём клиенту выбор продолжить играть или нет
    OPPONENT_QUITS     : 'OPPONENT_QUITS',      // Оповещаем клиента о желании соперника продолжить
    OPPONENT_CONTINUES : 'OPPONENT_CONTINUES',  // Оповещаем клиента о желании выйти из игры
    THEMES             : 'THEMES',              // Матрицы тем игрового поля
    QUESTION_THEMES    : 'QUESTION_THEMES',     // Массив id тем для вопросов
    SELECTED_CELL      : 'SELECTED_CELL',       // выбранная для хода Клетка
};

// ИСХОДЯЩИЕ
export const outMessages = {
    READY           : 'READY',           // Оповещаем сервер о том, что клиент подгрузился и можно стартовать таймер
    GO_TO           : 'GO_TO',           // Оповещаем клиента о клетке, которую выбрали для хода; payload = pair
    ANSWER          : 'ANSWER',          // Оповещаем сервер о выбранном ответе на вопрос; payload = int
    LEAVE           : 'LEAVE',           // Оповещаем клиента о выходе из комнаты
    QUIT            : 'QUIT',            // Оповещаем сервер о желании выйти из игры и в главное меню
    CONTINUE        : 'CONTINUE',        // Оповещаем сервер о желании продолжить игру с тем же соперником
    CHANGE_OPPONENT : 'CHANGE_OPPONENT'  // Оповещаем сервер о желании продолжить игру с другим соперником
};

export const gameConsts = {
    TIMER_PACK     : 180, // second
    TIMER_QUESTION : 10, // second
    TIMER_ANSWER   : 10, // second
    CELL_COUNT     : 8,
    FIRST_INDEX    : 0,
    LAST_INDEX     : 63,
    PRIZE_INDEXES  : [
        {
            x: 3,
            y: 3
        },
        {
            x: 3,
            y: 4
        },
        {
            x: 4,
            y: 3
        },
        {
            x: 4,
            y: 4
        }
    ],
    THEME_COLORS  : ['#B3B156','#80A352','#ADE0FF','#FFB454','#63bCC7', '#CC6264','#9e9e9e', '#ffc107','#009688','#607d8b'],
    PRIZE_COLOR   : '#0c5460'
};

export const botConsts = {
    waitingTime: {
        min: 1, // second
        max: 3 // second
    },
    winChance: 75 // %
};

export const gameName = 'Quiz Planet';
export const animationTime = 2;
