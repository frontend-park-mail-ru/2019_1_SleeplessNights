'use strict';
/************************ Templates *************************\/**/
import './components/avatar/avatar.tmpl.js';                  /**/
import './components/button/button.tmpl.js';                  /**/
import './components/buttonHome/buttonHome.tmpl.js';          /**/
import './components/card/card.tmpl.js';                      /**/
import './components/container/container.tmpl.js';            /**/
import './components/customFileInput/customFileInput.tmpl.js';/**/
import './components/form/form.tmpl.js';                      /**/
import './components/formControl/formControl.tmpl.js';        /**/
import './components/header/header.tmpl.js';                  /**/
import './components/link/link.tmpl.js';                      /**/
import './components/list/list.tmpl.js';                      /**/
import './components/menu/menu.tmpl.js';                      /**/
import './components/plug/plug.tmpl.js';                      /**/
import './components/pagination/pagination.tmpl.js';          /**/
import './components/sidebar/sidebar.tmpl.js';                /**/
import './components/scoreboard/board.tmpl.js';               /**/
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
/************************** Others **************************\/**/
import { makeAvatarPath } from './modules/utils.js';          /**/
import { Router } from './modules/router.js';                 /**/
import { AjaxModule } from './modules/ajax.js';               /**/
import bus from './modules/bus.js';                           /**/
/************************************************************\/**/

window.bus = bus;
window.ajax = AjaxModule;
window.user = {
    isAuthorised: AuthService.isAuthorised
};

bus
    .on('signup', (data) => {
        RegisterService.register(data)
            .then(() => {
                AuthService.setAuthorised();
                router.reopen('/');
            })
            .catch(res => bus.emit('error:signup', res.data));
    })
    .on('login', (data) => {
        AuthService.auth(data)
            .then(() => {
                AuthService.setAuthorised();
                router.reopen('/');
            })
            .catch(res => {
                if (res.status) bus.emit('error:login', res.data);
                else console.error(res);
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
            .catch(error => {

                console.error(error)
            });
    });

const app = document.getElementById('app');
const router = new Router(app);
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
                // const urls =performance.getEntriesByType('resource').map((r) => r.name).slice();
                // console.log(urls);
                // console.log(urls.length);
                registration.installing.postMessage(data);
            }
        })
        .catch((err) => console.log('SW registration FAIL:', err));
}
