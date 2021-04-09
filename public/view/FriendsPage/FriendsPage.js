import {addHeaderListeners} from "../../components/Header/handler.js";
import makeObservable from "../../observable.js";
import {addFriendsRequestListeners} from "../../components/FriendRequestBlock/handler.js"
import {http} from "../../modules/http.js";
import {router} from "../../modules/router.js";
import postStore from "../../Stores/PostStore.js";
import friendStore from '../../Stores/FriendStore.js';
import profilePage from '../Profile/ProfilePage.js'


export function addFriendsPageListeners() {
    // addHeaderListeners();
    // addFriendsRequestListeners();
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
        // if (this.state.viewState.myPage) {
        //     addCreatePostListeners();
        //     addProfileHeaderListener();
        // }
        // if (this.state.viewState.changePassword) {
        //     addChangePassListeners();
        // }
        // if (this.state.viewState.changeLogin) {
        //     addChangeLoginListeners();
        // }
    }

    registerEvents() {
        this.bind('friends-page-received', () => {
            console.log("huyak2")
            this.setFriendsInfo()
            this.setFollowersInfo()
            console.log(this.state)
            this.render();
            router.addEventsForLinks();
        })
    }

}

makeObservable(FriendPage)
const friendPage = new FriendPage();

export default friendPage
