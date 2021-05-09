import makeObservable from "../modules/observable.js";
import dispatcher from "../modules/dispatcher.js";
import {UserActions} from "../actions/UserActions.js";
import {http} from "../modules/http.js";
import {FriendStoreEvents} from "../consts/events.js";

class FriendStore {
    constructor() {
        this.state = {
            friends: [],
            followers: [],
            foundUsers: []
        };

        this.dispatchToken = dispatcher.register(this.actionsHandler.bind(this));
    }

    init() {
        this.sendProfileFollowersRequest()
            .then((res) => {
                const avatarPath = http.getHost() + '/static/usersAvatar/';
                const followers = res.body.map(user => {
                    user.imgAvatar = user.avatar === '' ? avatarPath + 'defaultUser.jpg' : avatarPath + user.avatar;
                    return user;
                });
                this.setState({followers});
            });

        this.sendProfileFriendsRequest()
            .then((res) => {
                const avatarPath = http.getHost() + '/static/usersAvatar/';
                const friends = res.body.map(user => {
                    user.imgAvatar = user.avatar === '' ? avatarPath + 'defaultUser.jpg' : avatarPath + user.avatar;
                    return user;
                });
                this.setState({friends});
            });
    }

    actionsHandler(action) {
        switch (action.type) {
            case UserActions.SEARCH_FRIEND:
                this.handleSearchFriendAction(action.data);
                break;

            case UserActions.ADD_FRIEND:
                this.handleAddFriendAction(action.data);
                break;

            case UserActions.REMOVE_FRIEND:
                this.handleRemoveFriendAction(action.data);
                break;

            case UserActions.FRIEND_PROFILE_REQUEST:
                break;

            case UserActions.FRIENDS_REQUEST:
                break;

            default:
                return;
        }
    }

    setState(updater) {
        Object.assign(this.state, updater);

        this.emit('changed', updater);
    }

    getState() {
        return this.state;
    }

    handleSearchFriendAction(data) {
        this.sendSearchFriendRequest(data)
            .then((res) => {
                const avatarPath = http.getHost() + '/static/usersAvatar/';
                const foundUsers = res.body.map(user => {
                    user.imgAvatar = user.avatar === '' ? avatarPath + 'defaultUser.jpg' : avatarPath + user.avatar;
                    return user;
                });
                this.setState({foundUsers});
                this.emit(FriendStoreEvents.SEARCH_FRIEND_REQUEST_SUCCESS, {foundUsers: this.state.foundUsers});
            })
            .catch(() => {
                this.emit(FriendStoreEvents.SEARCH_FRIEND_REQUEST_FAILED);
            });
    }

    handleAddFriendAction(data) {
        this.sendAddFriendRequest(data)
            .then(() => {
                this.emit(FriendStoreEvents.ADD_FRIEND_REQUEST_SUCCESS, data);
            })
            .catch(() => {
                this.emit(FriendStoreEvents.ADD_FRIEND_REQUEST_FAILED, data);
            });
    }

    handleRemoveFriendAction(data) {
        this.sendRemoveFriendRequest(data)
            .then(() => {
                this.emit(FriendStoreEvents.REMOVE_FRIEND_REQUEST_SUCCESS, data);
            })
            .catch(() => {
                this.emit(FriendStoreEvents.REMOVE_FRIEND_REQUEST_FAILED, data);
            });
    }

    async sendProfileFriendsRequest() {
        return await http.get({url: '/user/friends'});
    }

    async sendProfileFollowersRequest() {
        return await http.get({url: '/user/followers'});
    }

    async sendSearchFriendRequest({firstName, lastName}) {
        return await http.get({
            url: `/user/friend/search?first_name=${firstName}&last_name=${lastName}`
        });
    }

    async sendAddFriendRequest(data) {
        return await http.post({
            url: '/user/friend/add',
            data: JSON.stringify(data)
        });
    }

    async sendRemoveFriendRequest(data) {
        return await http.post({
            url: '/user/friend/remove',
            data: JSON.stringify(data)
        });
    }
}

makeObservable(FriendStore);

const friendStore = new FriendStore();

export default friendStore;