import {Component} from "../../modules/Component";
import {SearchFriend} from "../../components/SearchFriend/SearchFriend";
import {Friend} from "../../components/Friend/Friend";
import {FriendRequest} from "../../components/FriendRequest/FriendRequest";
import {Header} from "../../components/Header/Header";
import friendStore from "../../Stores/FriendStore";
import {FriendStoreEvents} from "../../consts/events";
import userStore from "../../Stores/UserStore";
import * as friendsPageTemplate from './FriendsPage.tmpl';
import './FriendsPage.css';

class FriendsPage extends Component {
    constructor() {
        super(friendsPageTemplate);

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
