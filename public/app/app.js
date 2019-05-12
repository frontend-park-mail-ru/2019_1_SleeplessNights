'use strict';
/************************ Templates *************************\/**/
import './components/answer/answer.tmpl.js';                  /**/
import './components/avatar/avatar.tmpl.js';                  /**/
import './components/button/button.tmpl.js';                  /**/
import './components/buttonHome/buttonHome.tmpl.js';          /**/
import './components/card/card.tmpl.js';                      /**/
import './components/container/container.tmpl.js';            /**/
import './components/container/container.tmpl.js';       /**/
import './components/customFileInput/customFileInput.tmpl.js';/**/
import './components/form/form.tmpl.js';                      /**/
import './components/form/control/formControl.tmpl.js';        /**/
import './components/gameBoard/gameBoard.tmpl.js';            /**/
import './components/gameBoard/cell/cell.tmpl.js';             /**/
import './components/header/header.tmpl.js';                  /**/
import './components/icon/icon.tmpl.js';                      /**/
import './components/link/link.tmpl.js';                      /**/
import './components/list/list.tmpl.js';                      /**/
import './components/loader/loader.tmpl.js';                  /**/
import './components/modal/modal.tmpl.js';                    /**/
import './components/pagination/pagination.tmpl.js';          /**/
import './components/pack/pack.tmpl.js';                      /**/
import './components/question/question.tmpl.js';              /**/
import './components/scoreboard/board.tmpl.js';               /**/
import './components/timer/timer.tmpl.js';                    /**/
/*************************** Views **************************\/**/
import { MenuView }    from './views/menu.js';                /**/
import { PlayView }    from './views/play.js';                /**/
import { AboutView }   from './views/about.js';               /**/
import { LeadersView } from './views/leaders.js';             /**/
import { LoginView }   from './views/login.js';               /**/
import { SignUpView }  from './views/signup.js';              /**/
import { ProfileView } from './views/profile.js';             /**/
import { NotFoundView } from './views/notFound.js';           /**/
/************************* Services *************************\/**/
import { RegisterService }   from './services/register.js';   /**/
import { ProfileService }    from './services/profile.js';    /**/
import { AuthService }       from './services/auth.js';       /**/
import { ScoreboardService } from './services/scoreboard.js'; /**/
import { GameService }       from './services/game.js';       /**/
/************************** Others **************************\/**/
import { makeAvatarPath } from './modules/utils.js';          /**/
import { Router } from './modules/router.js';                 /**/
import { events } from './game/core/events.js';               /**/
import { LoaderComponent } from './components/loader/loader.js';/**/
import bus from './modules/bus.js';                           /**/
import idb from './modules/indexdb.js';                       /**/
import '../assets/scss/main.scss';
/************************************************************\/**/

window.user = {
    nickname: 'guest',
    isAuthorised: AuthService.isAuthorised
};

const loader = new LoaderComponent();
const app = document.getElementById('app');
app.insertAdjacentHTML('afterend', loader.template);

idb.get('user', 1);
bus.on('success:get-user-1', (user) => {
    if (!user) {
        GameService.fillTestDB();
        return;
    }

    window.user.nickname = user.nickname;
});

bus.on('signup', (data) => {
    RegisterService.register(data)
        .then((response) => {
            AuthService.setAuthorised(response);
            router.open('/');
        })
        .catch(res => {
            if (res.status === 418 || !navigator.onLine) {
                bus.emit('error:sign-up', {error: 'Your are offline buddy'});
            } else {
                bus.emit('error:signup', res.data);
            }
        });
});

bus.on('check-validity-signup', (data) => {
    RegisterService.checkValidity(data)
        .then(() => bus.emit('success:check-validity-signup'))
        .catch(res => bus.emit('error:signup', res));
});

bus.on('login', (data) => {
    AuthService.auth(data)
        .then((response) => {
            AuthService.setAuthorised(response);
            router.open('/');
        })
        .catch(res => {
            if (res.status === 418 || !navigator.onLine) {
                bus.emit('error:login', {error: 'Your are offline buddy'});
            } else {
                bus.emit('error:login', res.data);
            }
        });
});

bus.on('check-validity-login', (data) => {
    AuthService.checkValidity(data)
        .then(() => bus.emit('success:check-validity-login'))
        .catch(res => bus.emit('error:login', res));
});

bus.on('get-profile', () => {
    ProfileService.getProfile()
        .then(profile => {
            profile.avatarPath = makeAvatarPath(profile.avatarPath);
            bus.emit('success:get-profile', profile);
        })
        .catch(error => {
            AuthService.removeAuthorised();
            if (error.status === 401) router.open('/login');
            else console.error('Error:', error);
        });
});

bus.on('update-profile', (data) => {
    ProfileService.updateProfile(data)
        .then(res => bus.emit('success:update-profile', makeAvatarPath(res.avatarPath)))
        .catch(res => bus.emit('error:update-profile', res.data));
});

bus.on('check-validity-profile', (data) => {
    ProfileService.checkValidity(data)
        .then(() => bus.emit('success:check-validity-profile'))
        .catch(res => bus.emit('error:update-profile', res));
});

bus.on('get-leaders', (page) => {
    ScoreboardService.getLeaders(page)
        .then(res => bus.emit('success:get-leaders', res))
        .catch(res => {
            if (res.status === 418 || !navigator.onLine) {
                bus.emit('error:get-leaders', 'Content is not available in offline mode');
            } else {
                console.error(res);
            }
        });
});

bus.on('logout', () => {
    AuthService.logout()
        .then(() => {
            AuthService.removeAuthorised();
            router.open('/')
        })
        .catch((err) => console.error(err));
});

bus.on('show-loader', () => loader.show())
    .on('hide-loader', () => loader.hide());

bus.on('check-indexedDB', GameService.checkDB);
bus.on(events.PLAY_AGAIN_OR_NOT, (data) => {
    bus.emit(events.FINISH_GAME);
    data ? router.open('/menu') : router.open('/play');
});

bus.on('start-game-multiplayer', () => {
    const gameService = new GameService();
    bus.on('game:send-message', gameService.sendMessage);
});

const router = new Router(app);
router
    .register('/', MenuView)
    .register('/about', AboutView)
    .register('/menu', MenuView)
    .register('/leaders', LeadersView)
    .register('/login', LoginView)
    .register('/play', PlayView)
    .register('/profile', ProfileView)
    .register('/signup', SignUpView)
    .register('/not-found', NotFoundView);

router
    .registerInAccess('/profile', false, '/login')
    .registerInAccess('/login', true, '/profile')
    .registerInAccess('/signup', true, '/profile');

router.start();

// const gameService = new GameService();


// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js', { scope: '/' })
//         .then((registration) => {
//             if (registration.installing) {
//                 const data = {
//                     type: 'CACHE_URLS',
//                     payload: [
//                         location.href,
//                         ...performance.getEntriesByType('resource').map((r) => r.name)
//                     ]
//                 };
//                 registration.installing.postMessage(data);
//             }
//         })
//         .catch((err) => console.log('SW registration FAIL:', err));
// }
