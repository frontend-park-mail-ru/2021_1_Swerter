import dispatcher from '../modules/dispatcher.js';
import makeObservable from '../modules/observable.js';
import {UserActions} from "../actions/UserActions.js";
import {Routes} from "../consts/Routes.js";
import userStore from "./UserStore.js";
import {AppStateStoreEvents, UserStoreEvents} from "../consts/events.js";

class AppStateStore {
    constructor(app) {
        this.app = app;
        this.routes = {};
        this.activeView = null;
        this.activeRoute = null;
        window.addEventListener('popstate', () => this.go(window.location.hash));

        this.dispatchToken = dispatcher.register(this.actionsHandler.bind(this));
        this.addEventListeners();
    }

    add(route, view) {
        this.routes[route] = view;
    }

    go(route) {
        const view = this.routes[route];
        if (!view) {
            if (view !== this.activeView) {
                this.go(Routes.DEFAULT_PAGE);
            }
            return;
        } else if (!view.allowed() || view === this.activeView) {
            return;
        }

        if (this.activeView) {
            this.activeView.hide();
            this.activeView = null;
        }

        this.activeView = view;
        this.activeRoute = route;
        view.renderTo(this.app);
        console.log(route, view);
        if (window.location.hash !== route) {
            window.history.pushState(null, '', route);
        }
        this.emit(AppStateStoreEvents.ROUTE_CHANGED, {newRoute: this.getActiveRoute()});
    }

    start() {
        this.go(window.location.hash);
    }

    actionsHandler(action) {
        switch (action.type) {
            case UserActions.GO_REGISTER:
                this.go(Routes.REGISTER_PAGE);
                break;

            case UserActions.REGISTER_FORM_CLOSE:
                this.go(Routes.LOGIN_PAGE);
                break;

            case UserActions.GO_HOME:
                this.go(Routes.DEFAULT_PAGE);
                break;

            case UserActions.GO_FRIENDS:
                this.go(Routes.FRIENDS_PAGE);
                break;

            case UserActions.GO_NEWS:
                this.go(Routes.NEWS_PAGE);
                break;

            default:
                return;
        }

        console.log(`AppStateStore action ${action} handled.`);
    }

    getActiveRoute() {
        return this.activeRoute;
    }

    addEventListeners() {
        userStore.on(UserStoreEvents.LOGIN_SUCCESS, () => this.go(Routes.DEFAULT_PAGE));
        userStore.on(UserStoreEvents.PROFILE_REQUEST_SUCCESS, () => this.go(Routes.PROFILE_PAGE));
        userStore.on(UserStoreEvents.PROFILE_REQUEST_FAILED, () => this.go(Routes.LOGIN_PAGE));
        userStore.on(UserStoreEvents.LOGOUT_SUCCESS, () => this.go(Routes.LOGIN_PAGE));
    }
}

makeObservable(AppStateStore);

const app = document.getElementById('app');
const appStateStore = new AppStateStore(app);

export default appStateStore;
