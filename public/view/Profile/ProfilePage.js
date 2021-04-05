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
            editCreds: false,
            changeLogin: false,
            changePassword: false,
        }
    };

    constructor() {
        this.registerEvents();
        let initInfo = false
        userStore.bind('init-user',()=> {
            this.setUserInfo();
            initInfo = true;
        });
        postStore.bind('init-user-posts', ()=> {
            if (!initInfo) {
                setTimeout(()=>{
                    this.setUserPosts();
                    this.render()
                    router.addEventsForLinks();
                }, 200)
            }
        });
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
            this.state.viewState.editCreds = false;
            this.state.viewState.changeLogin = false;
            this.state.viewState.changePassword = false;
            this.render();
            router.addEventsForLinks();
        })

        this.bind('modal-creds-opened',()=> {
            this.state.viewState.editCreds = !this.state.viewState.editCreds;
            this.render();
            router.addEventsForLinks();
        })

        this.bind('password-changed-opened',()=> {
            this.state.viewState.changeLogin = true;
            this.render();
            router.addEventsForLinks();
        })

        this.bind('login-changed-opened',()=> {
            this.state.viewState.changePassword = true;
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