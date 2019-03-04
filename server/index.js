'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());

const pages = ['game_modes', 'description', 'leaders', 'profile', 'login', 'signup'];
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
    }
];

app.get('/getLeaders', function (req, res) {
    const scorelist = Object.values(leaders)
        .sort((l, r) => (r.win - r.lost) - (l.win - l.lost));

    res.json({data: scorelist});
});

app.get('/:page', function (req, res) {
    const page = req.params.page;
    if (pages.indexOf(page) !== -1) {
        res.sendFile(path.resolve(__dirname, '../public/index.html'));
    } else {
        res.status(404).send('404 - Not found');
    }
});

const port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});
