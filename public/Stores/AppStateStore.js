import dispatcher from '../modules/dispatcher.js';
import makeObservable from '../modules/observable.js';

class AppStateStore {
    constructor(app) {
        this.app = app;
        this.routes = {};
        this.activeView = null;
        window.addEventListener('popstate', () => {
            this.go(window.location.hash)
        });

        this.dispatchToken = dispatcher.register(this.actionsHandler.bind(this));
    }

    add(route, view) {
        this.routes[route] = view;
    }

    go(route) {
        const view = this.routes[route];
        if (!view || view === this.activeView || !view.allowed()) {
            return;
        }

        if (this.activeView) {
            this.activeView.hide();
            this.activeView = null;
        }

        view.renderTo(this.app);
        this.activeView = view;
        if (window.location.hash !== route) {
            window.history.pushState(null, '', route);
        }
    }

    start() {
        this.go(window.location.hash);
    }

    actionsHandler(action) {
        switch (action.type) {
            default:
                return;
        }

        console.log(`AppStateStore action ${action} handled.`);
    }
}

makeObservable(AppStateStore);

const app = document.getElementById('app');
const appStateStore = new AppStateStore(app);

export default appStateStore;
