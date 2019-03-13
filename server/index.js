'use strict';

const express = require('express');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();
app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(cookie());

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.')[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    }
});
const upload = multer({storage: storage});

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
    let scorelist = [];

    if (page === undefined || +page <= 1) {
        page = 1;
    } else {
        page = +page;
    }

    scorelist = leaders.slice((page - 1) * pagePerList, pagePerList * page);
    // const data = Object.values(scorelist)
    //     .sort((l, r) => (r.win - r.lost) - (l.win - l.lost));

    res.json({
        pages_total: pageTotal,
        page: page,
        data: scorelist
    });
});

const pages = ['play', 'description', 'leaders', 'profile', 'login', 'signup'];

app.get('/:page', function (req, res) {
    const page = req.params.page;
    if (pages.indexOf(page) !== -1) {
        res.sendFile(path.resolve(__dirname, '../public/index.html'));
    } else {
        res.status(404).send('404 - Not found');
    }
});

app.patch('/api/profile', upload.single('avatar'), (req, res) => {
    res.status(400).json({
        'nickname': 'Nickname is too short',
        'email': 'This email has already exist'
    });
});

const port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`); // eslint-disable-line
});
