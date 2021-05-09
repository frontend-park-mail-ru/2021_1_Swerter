import {Component} from "../../modules/Component.js";
import {SearchFriend} from "../../components/SearchFriend/SearchFriend.js";
import {Friend} from "../../components/Friend/Friend.js";
import {FriendRequest} from "../../components/FriendRequest/FriendRequest.js";
import {Header} from "../../components/Header/Header.js";
import friendStore from "../../Stores/FriendStore.js";
import {FriendStoreEvents} from "../../consts/events.js";
import userStore from "../../Stores/UserStore.js";

class FriendsPage extends Component {
    constructor() {
        super(friendspageTemplate);

        this.state = {
            searched: false,
            foundUsers: [],
            followers: [],
            friends: []
        };

        this.registerChildComponent('Header', Header);
        this.registerChildComponent('SearchFriend', SearchFriend);
        this.registerChildComponent('Friend', Friend);

        const friendRequestProps = {
            onAddFriend: (id) => {

            },

            onRemoveFriend: (id) => {

            }
        };
        this.registerChildComponent('FriendRequest', FriendRequest, friendRequestProps);

        friendStore.on(FriendStoreEvents.SEARCH_FRIEND_REQUEST_SUCCESS, ({foundUsers}) => {
            this.updateState({foundUsers, searched: true});
        });

        friendStore.on('changed', () => this.onFriendStoreChanged());
        console.log('fs state', this.state)
    }

    onFriendStoreChanged() {
        this.updateState(friendStore.getState());
        console.log('fs state', this.state)
    }

    allowed() {
        return userStore.isUserAuthorized();
    }
}

const friendsPage = new FriendsPage();

export default friendsPage;
