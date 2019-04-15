'use strict';
/************************ Templates *************************\/**/
import './components/answer/answer.tmpl.js';                  /**/
import './components/avatar/avatar.tmpl.js';                  /**/
import './components/button/button.tmpl.js';                  /**/
import './components/buttonHome/buttonHome.tmpl.js';          /**/
import './components/card/card.tmpl.js';                      /**/
import './components/container/container.tmpl.js';            /**/
import './components/_new/container/container.tmpl.js';       /**/
import './components/customFileInput/customFileInput.tmpl.js';/**/
import './components/form/form.tmpl.js';                      /**/
import './components/formControl/formControl.tmpl.js';        /**/
import './components/gameBoard/gameBoard.tmpl.js';            /**/
import './components/gameBoardCell/cell.tmpl.js';             /**/
import './components/header/header.tmpl.js';                  /**/
import './components/link/link.tmpl.js';                      /**/
import './components/list/list.tmpl.js';                      /**/
import './components/menu/menu.tmpl.js';                      /**/
import './components/modal/modal.tmpl.js';                    /**/
import './components/pagination/pagination.tmpl.js';          /**/
import './components/plug/plug.tmpl.js';                      /**/
import './components/question/question.tmpl.js';              /**/
import './components/scoreboard/board.tmpl.js';               /**/
import './components/sidebar/sidebar.tmpl.js';                /**/
import './components/timer/timer.tmpl.js';                    /**/
/*************************** Views **************************\/**/
import { MenuView }    from './views/menu.js';                /**/
import { PlayView }    from './views/play.js';                /**/
import { AboutView }   from './views/about.js';               /**/
import { LeadersView } from './views/leaders.js';             /**/
import { LoginView }   from './views/login.js';               /**/
import { SignUpView }  from './views/signup.js';              /**/
import { ProfileView } from './views/profile.js';             /**/
/************************* Services *************************\/**/
import { RegisterService }   from './services/register.js';   /**/
import { ProfileService }    from './services/profile.js';    /**/
import { AuthService }       from './services/auth.js';       /**/
import { ScoreboardService } from './services/scoreboard.js'  /**/
import { GameService }       from './services/game.js';       /**/
/************************** Others **************************\/**/
import { makeAvatarPath } from './modules/utils.js';          /**/
import { Router } from './modules/router.js';                 /**/
import { AjaxModule } from './modules/ajax.js';               /**/
import bus from './modules/bus.js';                           /**/
import idb from './modules/indexdb.js';                       /**/
/************************************************************\/**/

window.bus = bus;
window.idb = idb;
window.ajax = AjaxModule;
window.user = {
    nickname: 'guest',
    isAuthorised: AuthService.isAuthorised
};

const app = document.getElementById('app');
const router = new Router(app);
window.router = router;

bus
    .on('signup', (data) => {
        RegisterService.register(data)
            .then(() => {
                AuthService.setAuthorised(data);
                router.reopen('/');
            })
            .catch(res =>{
                if (res.status === 418 || !navigator.onLine) {
                    bus.emit('error:sign-up', {error: `Your are offline buddy`});
                } else {
                    bus.emit('error:signup', res.data)
                }
            });
    })
    .on('login', (data) => {
        AuthService.auth(data)
            .then(() => {
                AuthService.setAuthorised(data);
                router.reopen('/');
            })
            .catch(res => {
                if (res.status === 418 || !navigator.onLine) {
                    bus.emit('error:login', {error: `Your are offline buddy`});
                } else {
                    bus.emit('error:login', res.data)
                }
            });
    })
    .on('get-profile', () => {
        ProfileService.getProfile()
            .then(profile => {
                profile.avatar_path = makeAvatarPath(profile.avatar_path);
                bus.emit('success:get-profile', profile);
            })
            .catch(error => {
                if (error.status === 401) router.open('/login');
                else console.error('Error:', error);
            });
    })
    .on('update-profile', (data) => {
        ProfileService.updateProfile(data)
            .then(res => bus.emit('success:update-profile', makeAvatarPath(res.avatar_path)))
            .catch(res => bus.emit('error:update-profile', res.data));
    })
    .on('get-leaders', (page) => {
        ScoreboardService.getLeaders(page)
            .then(res => bus.emit('success:get-leaders', res))
            .catch(res => {
                if (res.status === 418 || !navigator.onLine) {
                    bus.emit('error:get-leaders', `Content is not available in offline mode`);
                } else {
                    console.error(res)
                }
            });
    });

router
    .register('/', MenuView)
    .register('/about', AboutView)
    .register('/menu', MenuView)
    .register('/leaders', LeadersView)
    .register('/login', LoginView)
    .register('/play', PlayView)
    .register('/profile', ProfileView)
    .register('/signup', SignUpView);

router
    .registerInAccess('/profile', false, '/login')
    .registerInAccess('/login', true, '/profile')
    .registerInAccess('/signup', true, '/profile');

router.start();

// GameService.fillTestDB();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then((registration) => {
            if (registration.installing) {
                const data = {
                    type: 'CACHE_URLS',
                    payload: [
                        location.href,
                        ...performance.getEntriesByType('resource').map((r) => r.name)
                    ]
                };
                registration.installing.postMessage(data);
            }
        })
        .catch((err) => console.log('SW registration FAIL:', err));
}
