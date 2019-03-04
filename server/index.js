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

app.get('/:page', function (req, res) {
    const page = req.params.page;
    if (pages.indexOf(page) !== -1) {
        res.sendFile(path.resolve(__dirname, '../public/index.html'));
    } else {
        res.send('404 - Page not Found');
    }
});

const port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});
