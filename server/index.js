'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));

const leaders = [
    {
        name: 'Алексей',
        win: 20,
        lost: 0,
        playingTime: 100
    },
    {
        name: 'Джахонгир',
        win: 15,
        lost: 5,
        playingTime: 60
    },
    {
        name: 'Максим',
        win: 7,
        lost: 1,
        playingTime: 20
    },
    {
        name: 'Максим',
        win: 6,
        lost: 2,
        playingTime: 32
    },
    {
        name: 'Иван',
        win: 6,
        lost: 2,
        playingTime: 32
    },
    {
        name: 'Мартин',
        win: 6,
        lost: 2,
        playingTime: 65
    },
    {
        name: 'Миша',
        win: 4,
        lost: 9,
        playingTime: 320
    },
    {
        name: 'Влад',
        win: 8,
        lost: 1,
        playingTime: 23
    }
];

app.get('/scoreboard', function (req, res) {
    let page = req.query.page;
    const pagePerList = 4;
    const pageTotal = Math.ceil(leaders.length / pagePerList);

    if (page === undefined || +page <= 1) {
        page = 1;
    } else {
        page = +page;
    }

    const scorelist = leaders.slice((page - 1) * pagePerList, pagePerList * page);

    res.json({
        pages_total: pageTotal,
        page: page,
        data: scorelist
    });
});

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`); // eslint-disable-line
});
