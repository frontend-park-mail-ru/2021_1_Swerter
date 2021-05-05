import {Component} from '../../modules/Component.js';
import {AppStateStoreEvents, UserStoreEvents} from '../../consts/events.js';
import userStore from "../../Stores/UserStore.js";
import appStateStore from "../../Stores/AppStateStore.js";
import {Routes} from "../../consts/Routes.js";
import {UserActions} from "../../actions/UserActions.js";

export class ProfileHeader extends Component {
    constructor(props) {
        super(profileheaderTemplate, props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                imgBg: '',
                imgAvatar: ''
            },
            editMode: false,
            myPage: true
        }

        userStore.on(UserStoreEvents.STORE_CHANGED, () => this.userStoreChanged());
        appStateStore.on(AppStateStoreEvents.ROUTE_CHANGED, () => this.appStateStoreRouteChanged());

        this.registerElementEvent('click', this.onAlbumsSwitchClick, this.getAlbumsSwitchButtonElement);
        this.registerElementEvent('click', this.onPostsSwitchClick, this.getPostsSwitchButtonElement);

        this.registerElementEvent('click', this.onUploadAvatarClick, this.getUploadAvatarElement);
        this.registerElementEvent('click', this.onEditProfileClick, this.getEditProfileButtonElement);
        this.registerElementEvent('click', this.onSubmitProfileChanges, this.getSubmitProfileChangesElement);

        this.userStoreChanged();
    }

    userStoreChanged() {
        const {firstName, lastName, imgBg, imgAvatar} = userStore.getState();
        this.updateState({user: {firstName, lastName, imgBg, imgAvatar}});
    }

    appStateStoreRouteChanged() {
        const myPage = appStateStore.getActiveRoute() === Routes.PROFILE_PAGE;
        this.updateState({myPage});
    }

    onUploadAvatarClick() {
        const inputAvaImg = document.createElement('input');
        inputAvaImg.type = 'file';
        inputAvaImg.onchange = (e) => {
            const imgAvaFile = inputAvaImg.files[0];
            this.dispatchUserAction(UserActions.NEW_USER_AVATAR, {
                imgInfo: {imgAvaFile},
            });
        };
        inputAvaImg.click();
    }

    onEditProfileClick() {
        this.updateState({editMode: true});
    }

    onSubmitProfileChanges() {
        const firstName = this.getFirstNameInputElement().value.replace(/<\/?[^>]+(>|$)/g, '');
        const lastName = this.getLastNameInputElement().value.replace(/<\/?[^>]+(>|$)/g, '');

        this.dispatchUserAction(UserActions.USER_PROFILE_UPDATE, {firstName, lastName});
        this.updateState({editMode: false});
    }

    onPostsSwitchClick() {
        this.props.onPostsSwitchButtonClick();
    }

    onAlbumsSwitchClick() {
        this.props.onAlbumsSwitchButtonClick();
    }

    getPostsSwitchButtonElement() {
        return this.element.getElementsByClassName('posts-switch')[0];
    }

    getAlbumsSwitchButtonElement() {
        return this.element.getElementsByClassName('albums-switch')[0];

    }

    getUploadAvatarElement() {
        return this.element.getElementsByClassName('profile-header-upload-ava')[0];
    }

    getSubmitProfileChangesButtonElement() {
        return this.element.getElementsByClassName('profile-header-edit-submit')[0];
    }

    getEditProfileButtonElement() {
        return this.element.getElementsByClassName('btn-edit-profile')[0];
    }

    getSubmitProfileChangesElement() {
        return this.element.getElementsByClassName('btn-edit-submit-profile')[0];
    }

    getFirstNameInputElement() {
        return this.element.getElementsByClassName('input-firstname')[0];
    }

    getLastNameInputElement() {
        return this.element.getElementsByClassName('input-lastname')[0];
    }
}