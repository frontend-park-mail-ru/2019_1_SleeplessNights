'use strict';
/********************** Templates **************************/
import {} from './components/avatar/avatar.tmpl.js';
import {} from './components/button/button.tmpl.js';
import {} from './components/buttonHome/buttonHome.tmpl.js';
import {} from './components/card/card.tmpl.js';
import {} from './components/container/container.tmpl.js';
import {} from './components/customFileInput/customFileInput.tmpl.js';
import {} from './components/form/form.tmpl.js';
import {} from './components/formControl/formControl.tmpl.js';
import {} from './components/header/header.tmpl.js';
import {} from './components/link/link.tmpl.js';
import {} from './components/list/list.tmpl.js';
import {} from './components/menu/menu.tmpl.js';
import {} from './components/plug/plug.tmpl.js';
import {} from './components/sidebar/sidebar.tmpl.js';
import {} from './components/scoreboard/board.tmpl.js';
/********************** Views *********************************/
import { MenuView }        from './views/menu.js';
import { PlayView }        from './views/play.js';
import { DescriptionView } from './views/description.js';
import { LeadersView }     from './views/leaders.js';
import { LoginView }       from './views/login.js';
import { SignUpView }      from './views/signup.js';
import { ProfileView }     from './views/profile.js';

const app = document.getElementById('app');

const pages = {
    menu: createMenu,
    leaders: createLeaders,
    description: createDescription,
    play: createPlay,
    login: createLogin,
    signup: createSignUp,
    profile: createProfile
};

function changeUrl(title, url) {
    document.title = title;
    history.replaceState({}, title, url);
    // history.pushState({}, title, url);
}

function createMenu(url) {
    const menu = new MenuView(app);
    const title = menu.pageTitle;

    changeUrl(title, url);
    menu.render();
}

function createLeaders(url) {
    const leaders = new LeadersView(app);
    const title = leaders.pageTitle;

    changeUrl(title, url);
    leaders.render();
}

function createPlay(url) {
    const play = new PlayView(app);
    const title = play.pageTitle;

    changeUrl(title, url);
    play.render();
}

function createDescription(url) {
    const description = new DescriptionView(app);
    const title = description.pageTitle;

    changeUrl(title, url);
    description.render();
}

function createLogin(url) {
    const login = new LoginView(app);
    const title = login.pageTitle;

    changeUrl(title, url);
    login.render();
}

function createSignUp(url) {
    const signUp = new SignUpView(app);
    const title = signUp.pageTitle;

    changeUrl(title, url);
    signUp.render();
}

function createProfile(url) {
    const profile = new ProfileView(app);
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
