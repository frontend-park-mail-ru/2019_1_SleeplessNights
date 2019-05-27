import { animationTime } from './constants.js';

export class Router {
    constructor (root) {
        this.routes = {};
        this.inAccessRoutes = {};
        this.root = root;
    }

    register(path, View) {
        this.routes[ path ] = {
            View: View,
            view: null,
            el: null
        };

        return this;
    }

    registerInAccess(path, authorised, locationTo) {
        this.inAccessRoutes[ path ] = {
            authorised: authorised,
            locationTo: locationTo || '/'
        };
        return this;
    }

    open(path) {
        this.waitingTime = 0;
        const route = this.routes[ path ];

        if (!route) {
            this.open('/not-found');
            return;
        }

        let { View, view, el } = route;
        if (!el) {
            el = document.createElement('section');
            el.style.height = '100vh';
            this.root.appendChild(el);
        }

        if (!view) {
            view = new View(el);
        }

        Object.values(this.routes).forEach( ({ view }) => {
            if (view && view.active) {
                view.hide();
                this.waitingTime = animationTime;
            }
        });

        setTimeout(() => {
            const currentPath = window.location.pathname.replace(/\/$/, '');
            if (currentPath !== path) {
                window.history.pushState(null, '', path);
            }

            view.show();
            document.title = view.pageTitle;
        }, this.waitingTime * 1000);

        this.routes[ path ] = { View, view, el };
    }

    start() {
        this.root.addEventListener('click', (event) => {
            let target = event.target;
            if (target.parentElement instanceof HTMLAnchorElement) {
                target = target.parentElement;
            }

            if (target.dataset.href) {
                event.preventDefault();
                if (target.dataset.href === 'scoreboard') {
                    return;
                }

                const url = target.pathname || target.dataset.href;
                this.open(url);
            }
        });

        window.addEventListener('popstate', () => {
            const currentPath = window.location.pathname;
            this.open(currentPath);
        });

        this.observeLocation();
    }

    observeLocation () {
        let currentPath = window.location.pathname;
        if (currentPath !== '/') {
            currentPath = currentPath.replace(/\/$/, '');
        }

        if (this.inAccessRoutes.hasOwnProperty(currentPath)) {
            const route = this.inAccessRoutes[currentPath];
            if ((user.isAuthorised && route.authorised) || (!user.isAuthorised && !route.authorised)) {
                this.open(route.locationTo);
                return;
            }
        }

        this.open(currentPath);
    }
}
