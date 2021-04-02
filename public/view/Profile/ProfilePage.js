import {addCreatePostListeners} from "../../components/AddPost/handler.js";
import {addProfileHeaderListener} from "../../components/ProfileHeader/handler.js";
import {addChangeLoginListeners, addChangePassListeners} from "../../components/ConfigModal/handler.js";
import {addHeaderListeners} from "../../components/Header/handler.js";
import makeObservable from "../../observable.js";
import {http} from "../../modules/http.js";
import {router} from "../../modules/router.js";
import postStore from "../../Stores/PostStore.js";


class ProfilePage {
    state = {
        postsData: [],
        userData: {
            login: 'login',
            password: 'password',
            firstName: 'Dima',
            lastName: 'Akzhigitov',
            imgBg: './assets/imgContent.jpg',
            imgAvatar: './assets/imgLogo.jpg',
            modEdited: false,
            myPage: true,
            needUpdate: false,
        },
    };

    constructor() {
        postStore.getAll().then((posts) => {
            this.state.postsData = this.addMetaInfoPosts(posts)
        })
        this.registerEvents();
    }

    render() {
        window.application.innerHTML = profileTemplate(this.state);
        this.addListeners();
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
            postStore.getAll().then((posts) => {
                this.state.postsData = this.addMetaInfoPosts(posts);
                console.log(this.state)
                this.render();
                router.addEventsForLinks();
            })
        })
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