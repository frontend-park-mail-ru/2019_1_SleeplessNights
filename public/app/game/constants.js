// ВХОДЯЩИЕ
export const inMessages = {
    startGame         : 'START_GAME',          // Оповещаем клиентов о том, что комната готова и они могут начать её отрисовывать
    yourTurn          : 'YOUR_TURN',           // Оповещаем клиента о начале его хода
    enemyTurn         : 'ENEMY_TURN',          // Оповещаемк клиента о том, что ходит его оппонент
    availableCells    : 'AVAILABLE_CELLS',     // Оповещаем клиента о том, на какие клетки он может ходить; payload = []pair
    yourQuestion      : 'QUESTION',            // Даём клиенту вопрос, связанный с клеткой; payload = question
    enemyQuestion     : 'ENEMY_QUESTION',      // Оповещаем клиента о вопросе, на который отвечает его оппонент; payload = question
    enemyAnswer       : 'ENEMY_ANSWER',        // Оповещаем клиента об ответе, который дал его оппонент; payload = int
    correct           : 'CORRECT',             // Оповещаем обоих клиентов о том, что ответ на вопрос верен
    incorrect         : 'INCORRECT',           // Оповещаем обоих клиентов о том, что ответ на вопрос неверен
    loss              : 'LOSS',                // Оповещаем клиента о его поражении
    win               : 'WIN',                 // Оповещаем клиента о его победе
    opponentProfile   : 'OPPONENT_PROFILE',    // Данные оппонента
    wannaPlayAgain    : 'WANNA_PLAY_AGAIN',    // Даём клиенту выбор продолжить играть или нет
    opponentLeaves    : 'OPPONENT_QUITS',      // Оповещаем клиента о желании соперника продолжить
    opponentContinues : 'OPPONENT_CONTINUES',  // Оповещаем клиента о желании выйти из игры
};

// ИСХОДЯЩИЕ
export const outMessages = {
    ready           : 'READY',           // Оповещаем сервер о том, что клиент подгрузился и можно стартовать таймер
    goTo            : 'GO_TO',           // Оповещаем клиента о клетке, которую выбрали для хода; payload = pair
    clientAnswer    : 'ANSWER',          // Оповещаем сервер о выбранном ответе на вопрос; payload = int
    leave           : 'LEAVE',           // Оповещаем клиента о выходе из комнаты
    quit            : 'QUIT',            // Оповещаем сервер о желании выйти из игры и в главное меню
    continue        : 'CONTINUE',        // Оповещаем сервер о желании продолжить игру с тем же соперником
    changeOpponent  : 'CHANGE_OPPONENT'  // Оповещаем сервер о желании продолжить игру с другим соперником
};

export const CELL_COUNT = 8;
export const FIRST_INDEX = 0;
export const LAST_INDEX = 63;
