export class Router {
    constructor (root) {
        this.routes = {};
        this.root = root;
    }

    register (path, View) {
        this.routes[ path ] = {
            View: View,
            view: null,
            el: null
        };

        return this;
    }

    open (path) {
        const route = this.routes[ path ];
        if (!route) {
            this.open('/');
            return;
        }

        if (window.location.pathname !== path) {
            window.history.pushState(null, '', path);
        }

        let { View, view, el } = route;
        if (!el) {
            el = document.createElement('section');
            this.root.appendChild(el);
        }

        if (!view) {
            view = new View(el);
        }

        if (!view.active) {
            Object.values(this.routes).forEach( ({view}) => {
                if (view && view.active) {
                    view.hide();
                }
            });

            view.show();
            document.title = view.pageTitle;
        }

        this.routes[ path ] = { View, view, el };
    }

    start () {
        this.root.addEventListener('click', (event) => {
            let target = event.target;
            if ((target instanceof HTMLAnchorElement) || (target.parentElement instanceof HTMLAnchorElement)) {

                if (target.parentElement instanceof HTMLAnchorElement) {
                    target = target.parentElement;
                }

                event.preventDefault();
                if (target.dataset.href === 'scoreboard') {
                    return;
                }

                const url = target.pathname;
                this.open(url);
            }
        });

        window.addEventListener('popstate', () => {
            const currentPath = window.location.pathname;
            this.open(currentPath);
        });

        const currentPath = window.location.pathname;
        this.open(currentPath);
    }
}
