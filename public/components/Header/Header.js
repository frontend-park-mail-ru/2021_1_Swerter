import {Component} from "../../modules/Component.js";
import userStore from "../../Stores/UserStore.js";
import {UserStoreEvents} from "../../consts/events.js";
import {UserActions} from "../../actions/UserActions.js";

export class Header extends Component {
    constructor(props) {
        super(headerTemplate, props);

        this.state = {
            editMode: false,
            myPage: true,
            user: {
                imgAvatar: null
            }
        };

        userStore.on(UserStoreEvents.STORE_CHANGED, () => this.userStoreChanged());

        this.registerElementEvent('click', this.onHomeButtonClick, this.getHomeButtonElement);
        this.registerElementEvent('click', this.onFriendsButtonClick, this.getFriendsButtonElement);
        this.registerElementEvent('click', this.onNewsButtonClick, this.getNewsButtonElement);
        this.registerElementEvent('click', this.onSettingsButtonClick, this.getSettingsButtonElement);
        this.registerElementEvent('click', this.onLogoutButtonClick, this.getLogoutButtonElement);

        this.userStoreChanged();
    }

    onHomeButtonClick() {
        this.dispatchUserAction(UserActions.GO_HOME);
    }

    onFriendsButtonClick() {
        this.dispatchUserAction(UserActions.GO_FRIENDS);
    }

    onNewsButtonClick() {
        this.dispatchUserAction(UserActions.GO_NEWS);
    }

    onSettingsButtonClick() {
        this.updateState({editMode: !this.state.editMode});
    }

    onLogoutButtonClick() {
        this.dispatchUserAction(UserActions.LOGOUT_REQUEST);
    }

    userStoreChanged() {
        const {imgAvatar} = userStore.getState();
        this.updateState({user: {imgAvatar}});
    }

    getSettingsButtonElement() {
        return this.element.getElementsByClassName('header__edit-creds')[0];
    }

    getHomeButtonElement() {
        return this.element.getElementsByClassName('home')[0];
    }

    getFriendsButtonElement() {
        return this.element.getElementsByClassName('friends')[0];
    }

    getNewsButtonElement() {
        return this.element.getElementsByClassName('news')[0];
    }

    getLogoutButtonElement() {
        return this.element.getElementsByClassName('logout')[0];
    }
}