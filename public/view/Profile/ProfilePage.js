import {addCreatePostListeners} from "../../components/AddPost/handler.js";
import {addProfileHeaderListener} from "../../components/ProfileHeader/handler.js";
import {addChangeLoginListeners, addChangePassListeners} from "../../components/ConfigModal/handler.js";
import {addHeaderListeners} from "../../components/Header/handler.js";
import {addPostListeners} from "../../components/Post/handler.js";
import {addPostModalListeners} from "../../components/PostModal/handler.js";
import makeObservable from "../../observable.js";
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
            editCreds: false,
            changeLogin: false,
            changePassword: false,
            postAdding: false,
            contentUrls:[],
        }
    };

    constructor() {
        this.registerEvents();
    }

    render() {
        window.application.innerHTML = profileTemplate(this.state);
        this.addListeners();
    }

    setUserInfo() {
        this.state.userData.imgAvatar = userStore.user.imgAvatar;
        this.state.userData.firstName = userStore.user.firstName;
        this.state.userData.lastName = userStore.user.lastName
    }

    setUserPosts() {
        this.state.postsData = this.addMetaInfoPosts(postStore.userPosts);
    }

    setDefaultViewFlags() {
        this.state.viewState.myPage = true;
        this.state.viewState.editCreds = false;
        this.state.viewState.changePassword = false;
        this.state.viewState.changeLogin = false;
        this.state.viewState.modEdited = false;
        this.state.viewState.postAdding = false;
    }

    addListeners() {
        addHeaderListeners();
        addPostListeners();
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
        if (this.state.viewState.postAdding) {
            addPostModalListeners();
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

        this.bind('edit-name',()=> {
            this.state.viewState.modEdited = true;
            this.render();
            router.addEventsForLinks();
        })

        this.bind('end-edit-name',()=> {
            this.state.viewState.modEdited = false;
            this.render();
            router.addEventsForLinks();
        })

        this.bind('new-name-setted',()=> {
            this.state.userData.firstName = userStore.user.firstName;
            this.state.userData.lastName = userStore.user.lastName;
            this.state.postsData = this.addMetaInfoPosts(this.state.postsData);
            this.render();
            router.addEventsForLinks();
        })

        this.bind('modal-closed',()=> {
            this.setDefaultViewFlags()
            this.render();
            router.addEventsForLinks();
        })

        this.bind('modal-creds-opened',()=> {
            this.state.viewState.editCreds = !this.state.viewState.editCreds;
            this.render();
            router.addEventsForLinks();
        })

        this.bind('password-changed-opened',()=> {
            this.state.viewState.changePassword = true;
            this.render();
            router.addEventsForLinks();
        })

        this.bind('login-changed-opened',()=> {
            this.state.viewState.changeLogin = true;
            this.render();
            router.addEventsForLinks();
        })

        this.bind('authorized',()=> {
            this.setDefaultViewFlags();
            this.setUserInfo();
            this.setUserPosts();
            this.render();
            router.addEventsForLinks();
        })


        this.bind('logouted',()=> {
            this.setDefaultViewFlags();
            this.state.userData.imgAvatar = '';
            this.state.userData.firstName = '';
            this.state.userData.lastName = '';
            this.state.postsData = [];
            router.go('/login');
        })

        this.bind('profile-getted',()=> {
            this.state.viewState.myPage = true;
            this.setUserInfo();
            this.setUserPosts();
            this.render();
            router.addEventsForLinks();
        })

        this.bind('friend-page-getted', () => {
            this.state.viewState.myPage = false;
            this.setUserInfo();
            this.setUserPosts();
            this.render();
            router.addEventsForLinks();
        })

        this.bind('like-changed', () => {
            this.state.postsData = this.addMetaInfoPosts(postStore.userPosts);
            this.render();
            router.addEventsForLinks();
        })

        this.bind('post-adding', () => {
            this.state.viewState.postAdding = true;
            this.render();
            router.addEventsForLinks();
        })

        this.bind('content-post-added', () => {
            this.state.viewState.contentUrls = postStore.getUrlsContent();
            console.log(this.state.viewState.contentUrls)
            this.render();
            router.addEventsForLinks();
        })

    }

    addMetaInfoPosts(posts) {
        return posts.map((item) => {
            item.imgAvatar = this.state.userData.imgAvatar;
            item.postCreator = this.state.userData.firstName + ' ' + this.state.userData.lastName;
            return item;
        });
    }

}

makeObservable(ProfilePage)
const profilePage = new ProfilePage();

export default profilePage
