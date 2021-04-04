import {addCreatePostListeners} from "../../components/AddPost/handler.js";
import {addProfileHeaderListener} from "../../components/ProfileHeader/handler.js";
import {addChangeLoginListeners, addChangePassListeners} from "../../components/ConfigModal/handler.js";
import {addHeaderListeners} from "../../components/Header/handler.js";
import makeObservable from "../../observable.js";
import {http} from "../../modules/http.js";
import {router} from "../../modules/router.js";
import postStore from "../../Stores/PostStore.js";
import userStore from "../../Stores/UserStore.js";


class ProfilePage {
    state = {
        postsData: [],
        userData: {
            firstName: '',
            lastName: '',
            imgBg: './assets/imgContent.jpg',
            imgAvatar: '',
        },
        viewState: {
            modEdited: false,
            myPage: true,
            needUpdate: false,
        }
    };

    constructor() {
        userStore.bind('init-user',()=> {
            this.setUserInfo();
            this.registerEvents();
        })
    }

    render() {
        console.log(this.state.userData.imgAvatar);
        window.application.innerHTML = profileTemplate(this.state);
        this.addListeners();
    }

    setUserInfo() {
        this.state.userData.imgAvatar = userStore.user.imgAvatar;
        this.state.userData.firstName = userStore.user.firstName;
        this.state.userData.lastName = userStore.user.lastName
        this.state.postsData = this.addMetaInfoPosts(postStore.userPosts);
    }

    addListeners() {
        addHeaderListeners();
        addCreatePostListeners();
        addProfileHeaderListener();
        if (profileData.userData.changePassword) {
            addChangePassListeners();
        }
        if (profileData.userData.changeLogin) {
            addChangeLoginListeners();
        }
    }

    registerEvents() {
        this.bind('post-added', () => {
            this.state.postsData = this.addMetaInfoPosts(postStore.userPosts);
            this.render();
            router.addEventsForLinks();
        })

        this.bind('ava-uploaded', () => {
            this.state.userData.imgAvatar = userStore.user.imgAvatar;
            this.state.postsData = this.addMetaInfoPosts(this.state.postsData);
            this.render();
            router.addEventsForLinks();
        })

        // this.bind('friend-profile', () => {
        //     this.state.userData.imgAvatar = userStore.;
        //     this.render();
        //     router.addEventsForLinks();
        // })
    }

    addMetaInfoPosts(posts) {
        let listPosts = [];
        for (const key in posts) {
            posts[key].imgContent = posts[key].imgContent ? http.getHost() + posts[key].imgContent : '';
            listPosts.push(posts[key]);
        }
        listPosts.reverse();
        return listPosts.map((item) => {
            item.imgAvatar = this.state.userData.imgAvatar;
            item.postCreator = this.state.userData.firstName + ' ' + this.state.userData.lastName;
            return item;
        });
    }

}

makeObservable(ProfilePage)
const profilePage = new ProfilePage();

export default profilePage