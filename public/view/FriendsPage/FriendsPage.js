import {addHeaderListeners} from "../../components/Header/handler.js";
import makeObservable from "../../observable.js";
import {http} from "../../modules/http.js";
import {router} from "../../modules/router.js";
import postStore from "../../Stores/PostStore.js";
import friendStore from '../../Stores/FriendStore.js';
import profilePage from '../Profile/ProfilePage.js'


// export function addFriendsPageListeners() {
//     addHeaderListeners();
// }

class FriendPage {
    state = []

    constructor() {
        this.registerEvents();
    }

    render() {
        window.application.innerHTML = friendspageTemplate(this.state);
        //todo: не забудь настроить
        // this.addListeners();
    }

    setFriendsInfo() {
        this.state.friends = friendStore.friends;
        //костыль хедера
        this.state.userData = profilePage.state.userData
        this.state.viewState = profilePage.state.viewState
    }


    addListeners() {
        addHeaderListeners();
        if (this.state.viewState.myPage) {
            addCreatePostListeners();
            addProfileHeaderListener();
        }
        if (this.state.viewState.changePassword) {
            addChangePassListeners();
        }
        if (this.state.viewState.changeLogin) {
            addChangeLoginListeners();
        }
    }

    registerEvents() {
        this.bind('friends-page-getted', () => {
            console.log("huyak2")
            this.setFriendsInfo()
            console.log(this.state)
            // this.state.viewState.myPage = false;
            // this.setUserInfo();
            // this.setUserPosts();
            this.render();
            // router.addEventsForLinks();
        })
    }

}

makeObservable(FriendPage)
const friendPage = new FriendPage();

export default friendPage
