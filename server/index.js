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
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.')[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`)
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
    }
];

app.get('/getLeaders', function (req, res) {
    const scorelist = Object.values(leaders)
        .sort((l, r) => (r.win - r.lost) - (l.win - l.lost));

    res.json({data: scorelist});
});

const pages = ['play', 'description', 'leaders', 'profile', 'login', 'signup'];

app.get('/:page', function (req, res) {
    console.log(req);
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
    console.log(`Server listening port ${port}`);
});
