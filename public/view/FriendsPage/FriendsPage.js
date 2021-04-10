import {addHeaderListeners} from "../../components/Header/handler.js";
import makeObservable from "../../observable.js";
import {addFriendsRequestListeners} from "../../components/FriendRequestBlock/handler.js"
import {addFriendsListeners} from "../../components/FriendBlock/handler.js"
import {http} from "../../modules/http.js";
import {router} from "../../modules/router.js";
import postStore from "../../Stores/PostStore.js";
import friendStore from '../../Stores/FriendStore.js';
import profilePage from '../Profile/ProfilePage.js'


export function addFriendsPageListeners() {
    addHeaderListeners();
    addFriendsRequestListeners();
    addFriendsListeners();
}

class FriendPage {
    state = {
        friends : [],
        followers : [],
    }

    constructor() {
        this.registerEvents();
    }

    render() {
        window.application.innerHTML = friendspageTemplate(this.state);
        this.addListeners();
    }

    setFriendsInfo() {
        this.state.friends = friendStore.state.friends;
        //костыль хедера
        this.state.userData = profilePage.state.userData
        this.state.viewState = profilePage.state.viewState
    }
    setFollowersInfo() {
        this.state.followers = friendStore.state.followers;
    }

    addListeners() {
        addHeaderListeners();
        addFriendsRequestListeners();
        addFriendsListeners();
    }

    registerEvents() {
        this.bind('friends-page-received', () => {
            this.setFriendsInfo()
            this.setFollowersInfo()
            this.render();
            router.addEventsForLinks();
        })
    }
}

makeObservable(FriendPage)
const friendPage = new FriendPage();

export default friendPage
