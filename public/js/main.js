'use strict';

import { MenuComponent } from '../components/menu/menu.js';
import { LeadersComponent } from '../components/leaders/leaders.js';
import { ProfileComponent } from '../components/profile/profile.js';
import { LoginComponent } from '../components/login/login.js';
import { SignUpComponent } from '../components/signup/signup.js';
import { DescriptionComponent } from '../components/description/description.js';
import { GameModesComponent } from '../components/game_modes/game_modes.js';

const app = document.getElementById('app');

const pages = {
    menu: createMenu,
    leaders: createLeaders,
    description: createDescription,
    gameModes: createGameModes,
    login: createLogin,
    signup: createSignup,
    profile: createProfile
};

function changeUrl(title, url) {
    document.title = title;
    history.replaceState({}, title, url);
    // history.pushState({}, title, url);
}

function createMenu(url) {
    const menu = new MenuComponent(app);
    const title = menu.pageTitle;

    changeUrl(title, url);
    menu.render();
}

function createLeaders(url) {
    const leaders = new LeadersComponent(app);
    const title = leaders.pageTitle;

    changeUrl(title, url);
    leaders.render();
}

function createGameModes(url) {
    const gameModes = new GameModesComponent(app);
    const title = gameModes.pageTitle;

    changeUrl(title, url);
    gameModes.render();
}

function createDescription(url) {
    const description = new DescriptionComponent(app);
    const title = description.pageTitle;

    changeUrl(title, url);
    description.render();
}

function createLogin(url) {
    const login = new LoginComponent(app);
    const title = login.pageTitle;

    changeUrl(title, url);
    login.render();
}

function createSignup(url) {
    const signup = new SignUpComponent(app);
    const title = signup.pageTitle;

    changeUrl(title, url);
    signup.render();
}

function createProfile(url) {
    const profile = new ProfileComponent(app);
    const title = profile.pageTitle;

    changeUrl(title, url);
    profile.render();
}

function renderPage() {
    const currentPath = window.location.pathname.replace('/', '');

    if (currentPath === '') {
        createMenu();
    } else {
        pages[ currentPath ](currentPath);
    }
}

renderPage();

app.addEventListener('click', function (event) {
    let target = event.target;
    if ((target instanceof HTMLAnchorElement) || (target.parentElement instanceof HTMLAnchorElement)) {

        if (target.parentElement instanceof HTMLAnchorElement) {
            target = target.parentElement;
        }

        event.preventDefault();
        const url = target.href;

        app.innerHTML = '';
        pages[ target.dataset.href ](url);
    }
});
