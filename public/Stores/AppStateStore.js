import dispatcher from '../modules/dispatcher';
import makeObservable from '../modules/observable';
import {UserActions} from "../actions/UserActions";
import {Routes} from "../consts/Routes";
import userStore from "./UserStore";
import {AlbumStoreEvents, AppStateStoreEvents, UserStoreEvents} from "../consts/events";
import albumStore from "./AlbumStore";

class AppStateStore {
    constructor(app) {
        this.app = app;
        this.routes = {};
        this.activeView = null;
        this.activeRoute = null;
        window.addEventListener('popstate', () => this.go(window.location.hash));

        this.dispatchToken = dispatcher.register(this.actionsHandler.bind(this));
    }

    register(route, view) {
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
        if (window.location.hash !== route) {
            window.history.pushState(null, '', route);
        }
        this.emit(AppStateStoreEvents.ROUTE_CHANGED, {newRoute: this.getActiveRoute()});
    }

    start() {
        console.log(window.location.hash);
        this.go(window.location.hash);
        this.addEventListeners();
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

            case UserActions.GO_NEW_ALBUM:
                this.go(Routes.NEW_ALBUM_PAGE);
                break;

            default:
                return;
        }
    }

    getActiveRoute() {
        return this.activeRoute;
    }

    addEventListeners() {
        userStore.on(UserStoreEvents.LOGIN_SUCCESS, () => this.go(Routes.DEFAULT_PAGE));
        userStore.on(UserStoreEvents.PROFILE_REQUEST_SUCCESS, () => this.onProfileRequestSuccess());
        userStore.on(UserStoreEvents.PROFILE_REQUEST_FAILED, () => this.go(Routes.LOGIN_PAGE));
        userStore.on(UserStoreEvents.LOGOUT_SUCCESS, () => this.go(Routes.LOGIN_PAGE));
        albumStore.on(AlbumStoreEvents.ALBUM_REQUEST_SUCCESS, () => this.go(Routes.ALBUM_PAGE));
    }

    onProfileRequestSuccess() {
        if (!this.activeView || !this.activeView.allowed()) {
            this.go(Routes.PROFILE_PAGE)
        }
    }
}

makeObservable(AppStateStore);

const app = document.getElementById('app');
const appStateStore = new AppStateStore(app);

export default appStateStore;
