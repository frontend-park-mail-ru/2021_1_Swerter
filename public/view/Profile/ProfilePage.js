import {addCreatePostListeners} from "../../components/AddPost/handler.js";
import {addProfileHeaderListener} from "../../components/ProfileHeader/handler.js";
import {addChangeLoginListeners, addChangePassListeners} from "../../components/ConfigModal/handler.js";
import {addHeaderListeners} from "../../components/Header/handler.js";
import {addPostListeners} from "../../components/Post/handler.js";
import {addPostModalAddListeners} from "../../components/PostModal/handler.js";
import {addPostModalEditListeners} from "../../components/PostModal/handler.js";
import {addShowModalAddListeners} from "../../components/ShowImgModal/handler.js";
import {addAlbumsListeners} from "../../components/AlbumPreview/handler.js"
import makeObservable from "../../observable.js";
import {router} from "../../modules/router.js";
import newAlbumPage from "../NewAlbumPage/NewAlbumPage.js"
import postStore from "../../Stores/PostStore.js";
import userStore from "../../Stores/UserStore.js";
import albumStore from '../../Stores/AlbumStore.js';

userStore.bind('init-user', ()=> {
    profilePage.emit('init-user')
})

class ProfilePage {
    state = {
        postsData: [],
        albumsData : [],
        showPost: false,
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
            postEditing: false,
            contentUrls: [],
            switchContent: "POSTS",
            newsPostText: "",
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
        this.state.viewState.switchContent = "POSTS"
        this.state.viewState.postEditing = false;
        this.state.showPost = false;
    }

    addListeners() {
        addHeaderListeners();
        addPostListeners();
        if (this.state.viewState.myPage) {
            addProfileHeaderListener();
            if (this.state.viewState.switchContent === "POSTS") {
                addCreatePostListeners();
            } else if (this.state.viewState.switchContent === "ALBUMS") {
                addAlbumsListeners();
                document.getElementById("create-album-block").addEventListener('click', () => {
                    newAlbumPage.emit("go-new-album-page");
                })
            }
        }
        if (this.state.viewState.changePassword) {
            addChangePassListeners();
        }
        if (this.state.viewState.changeLogin) {
            addChangeLoginListeners();
        }
        if (this.state.viewState.postAdding) {
            addPostModalAddListeners();
        }
        if (this.state.viewState.postEditing) {
            addPostModalEditListeners();
        }
        if (this.state.showPost) {
            addShowModalAddListeners();
        }

    }

    registerEvents() {
        this.bind('post-added', () => {
            this.setDefaultViewFlags()
            this.state.viewState.newsPostText = ''
            this.state.viewState.contentUrls = postStore.contentPost
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

        this.bind('edit-name', () => {
            this.state.viewState.modEdited = true;
            this.render();
            router.addEventsForLinks();
        })

        this.bind('end-edit-name', () => {
            this.state.viewState.modEdited = false;
            this.render();
            router.addEventsForLinks();
        })

        this.bind('new-name-setted', () => {
            this.state.userData.firstName = userStore.user.firstName;
            this.state.userData.lastName = userStore.user.lastName;
            this.state.postsData = this.addMetaInfoPosts(this.state.postsData);
            this.render();
            router.addEventsForLinks();
        })

        this.bind('modal-closed', () => {
            this.setDefaultViewFlags()
            console.log(this.state.showPost)
            this.render();
            router.addEventsForLinks();
        })

        this.bind('modal-creds-opened', () => {
            this.state.viewState.editCreds = !this.state.viewState.editCreds;
            this.render();
            router.addEventsForLinks();
        })

        this.bind('password-changed-opened', () => {
            this.state.viewState.changePassword = true;
            this.render();
            router.addEventsForLinks();
        })

        this.bind('login-changed-opened', () => {
            this.state.viewState.changeLogin = true;
            this.render();
            router.addEventsForLinks();
        })

        //8
        this.bind('authorized', () => {
            this.setDefaultViewFlags();
            this.setUserInfo();
            this.setUserPosts();
            //9
            this.render();
            router.addEventsForLinks();
        })

        this.bind('logouted', () => {
            this.setDefaultViewFlags();
            this.state.userData.imgAvatar = '';
            this.state.userData.firstName = '';
            this.state.userData.lastName = '';
            this.state.postsData = [];
            router.go('/login');
        })

        //рудимент
        this.bind('profile-getted', () => {
            this.state.viewState.myPage = true;
            this.setUserInfo();
            this.setUserPosts();
            this.render();
            router.addEventsForLinks();
        })

        this.bind('friend-page-received', () => {
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

        this.bind('content-post-changed', () => {
            this.state.viewState.contentUrls = postStore.getUrlsContent();
            this.render();
            router.addEventsForLinks();
        })


        this.bind('albums-switch', () => {
            this.state.viewState.switchContent = "ALBUMS";
            this.state.albumsData = albumStore.userAlbums
            this.render();
            router.addEventsForLinks();
        })

        this.bind('edit-all-images-btn', () => {
            this.state.viewState.postEditing = true;
            this.state.viewState.postAdding = false;

            this.render();
            router.addEventsForLinks();
        })


        this.bind('posts-switch', () => {
            this.state.viewState.switchContent = "POSTS"
            this.render();
            router.addEventsForLinks();
        })

        this.bind('post-edited-ended', () => {
            this.state.viewState.postEditing = false;
            this.state.viewState.postAdding = true;
            this.state.viewState.contentUrls = postStore.getUrlsContent();
            this.render();
            router.addEventsForLinks();
        })

        this.bind('text-post-changed', (text) => {
            this.state.viewState.newsPostText = text;
        })

        this.bind('show-post-img', (data) => {
            //смотрю из всех постов, что неправильно
            this.state.showPost = this.state.postsData.filter((item) => data.postId == item.ID)[0]
            if (!this.state.showPost) {
                this.state.showPost = postStore.newsPosts.filter((item) => data.postId == item.ID)[0]
            }
            //Потому что id фоток в посте с 1
            this.state.showPost.startImgId = data.imgId - 1
            this.render();
            router.addEventsForLinks();
        })

        this.bind('go-next-img', (data) => {
            if (this.state.showPost.startImgId < this.state.showPost.imgContent.length - 1) {
                this.state.showPost.startImgId++;
            }
            this.render();
            router.addEventsForLinks();
        })

        this.bind('go-prev-img', (data) => {
            if (this.state.showPost.startImgId > 0) {
                this.state.showPost.startImgId--;
            }
            this.render();
            router.addEventsForLinks();
        })


        this.bind('album-added', (data) => {
            this.state.viewState.switchContent = "ALBUMS";
            this.state.albumsData = albumStore.userAlbums
            console.log(this.state.albumsData)
            this.render();
            router.addEventsForLinks();
         })
        this.bind('init-user', ()=>{
            this.setDefaultViewFlags();
            this.setUserInfo();
            this.setUserPosts();
            this.emit('user-inited')
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
