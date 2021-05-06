import dispatcher from '../modules/dispatcher.js';
import makeObservable from '../modules/observable.js';
import {http} from "../modules/http.js";
import {UserActions} from "../actions/UserActions.js";
import {UserStoreEvents} from '../consts/events.js';

class UserStore {
    constructor() {
        this.user = {};
        this.dispatchToken = dispatcher.register(this.actionsHandler.bind(this));
    }

    init() {
        this.handleProfileRequestAction();
    }

    getState() {
        return this.user;
    }

    setState(updater) {
        Object.assign(this.user, updater);

        this.emit('changed', updater);
    }

    _setUserAuthorized() {
        this.setState({isAuthorized: true});
    }

    isUserAuthorized() {
        return this.user.isAuthorized === true;
    }

    actionsHandler(action) {
        switch (action.type) {
            case UserActions.LOGIN_REQUEST:
                this.handleLoginRequestAction(action.data);
                break;

            case UserActions.REGISTER_REQUEST:
                this.handleRegisterRequestAction(action.data);
                break;

            case UserActions.PROFILE_REQUEST:
                this.handleProfileRequestAction();
                break;

            case UserActions.NEW_USER_AVATAR:
                this.handleNewUserAvatarAction(action.data);
                break;

            case UserActions.USER_PROFILE_UPDATE:
                this.handleUserProfileUpdateAction(action.data);
                break;

            case UserActions.LOGOUT_REQUEST:
                this.handleLogoutRequestAction();
                break;


            default:
                return;
        }
    }

    handleProfileRequestAction() {
        this.sendProfileRequest()
            .then(({status, body}) => {
                switch (status) {
                    case http.STATUS.OK:
                        this.setState(body);
                        let imgAvatar = http.getHost() + '/static/usersAvatar/';
                        imgAvatar += body['avatar'] ? body['avatar'] : 'defaultUser.jpg';
                        this.setState({imgAvatar});
                        this._setUserAuthorized();
                        this.emit(UserStoreEvents.PROFILE_REQUEST_SUCCESS);
                        break;

                    default:
                        this.emit(UserStoreEvents.PROFILE_REQUEST_FAILED);
                }
            });
    }

    handleLoginRequestAction(data) {
        this.sendLoginRequest(data)
            .then(({status}) => {
                switch (status) {
                    case http.STATUS.OK:
                        this.setState({isAuthorized: true});
                        this.emit(UserStoreEvents.LOGIN_SUCCESS);
                        this.handleProfileRequestAction();
                        break;

                    default:
                        this.setState({isAuthorized: false});
                        this.emit(UserStoreEvents.LOGIN_FAILED);
                }
            });
    }

    handleRegisterRequestAction(data) {
        this.sendRegisterRequest(data)
            .then(({status}) => {
                switch (status) {
                    case http.STATUS.OK:
                    case http.STATUS.CREATED:
                        this.emit(UserStoreEvents.REGISTER_SUCCESS, data);
                        const credentials = {login: data.login, password: data.password};
                        this.handleLoginRequestAction(credentials);
                        break;

                    default:
                        this.emit(UserStoreEvents.REGISTER_FAILED);
                }
            });
    }

    handleNewUserAvatarAction(data) {
        this.sendUploadUserAvatarRequest(data.imgInfo).then((response) => {
                this.sendUserAvatarRequest().then((imgAvatar) => {
                    this.setState({imgAvatar});
                    this.emit(UserStoreEvents.STORE_CHANGED, {imgAvatar});
                })
            }
        );
    }

    handleUserProfileUpdateAction(data) {
        this.sendUpdateProfileRequest(data).then(() => {
            this.setState(data);
            this.emit(UserStoreEvents.PROFILE_UPDATE_SUCCESS);
        })
            .catch(() => {
                this.emit(UserStoreEvents.PROFILE_UPDATE_FAILED);
            });
    }

    handleLogoutRequestAction() {
        this.sendLogoutRequest().then(() => {
            this.setState({isAuthorized: false});
            this.emit(UserStoreEvents.LOGOUT_SUCCESS);
        });
    }

    handleNewPostAction() {

    }

    async sendLoginRequest(credentials) {
        return await http.post({url: '/login', data: JSON.stringify(credentials)});
    }

    async sendLogoutRequest() {
        return await http.post({url: '/logout'});
    }

    async sendRegisterRequest(data) {
        return await http.post({url: '/register', data: JSON.stringify(data)});
    }

    async sendProfileRequest() {
        return await http.get({url: '/profile'});
    }

    async sendUploadUserAvatarRequest(imgInfo) {
        const formData = new FormData();
        const imgContent = imgInfo.imgAvaFile;
        formData.append('avatar', imgContent);
        return http.post({url: '/profile/loadImg', data: formData, headers: {}});
    }

    async sendUserAvatarRequest() {
        const userData = await http.get({url: '/profile'});
        let imgAvatar = http.getHost() + '/static/usersAvatar/';
        imgAvatar += userData.body['avatar'] ? userData.body['avatar'] : 'defaultUser.jpg';
        return imgAvatar;
    }

    async sendUpdateProfileRequest(newProfileData) {
        return http.post({
            url: '/profile', data: JSON.stringify(newProfileData),
        });
    }

    async sendAddPostRequest(post) {

    }
}

makeObservable(UserStore);

const userStore = new UserStore();

export default userStore;
