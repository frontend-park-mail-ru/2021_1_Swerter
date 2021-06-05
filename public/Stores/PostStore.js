import {UserActions} from "../actions/UserActions";
import makeObservable from "../modules/observable";
import dispatcher from "../modules/dispatcher";
import {http} from "../modules/http";
import {PostStoreEvents, UserStoreEvents} from "../consts/events";
import userStore from "./UserStore";

class PostStore {
    constructor() {
        this.posts = [];
        this.dispatchToken = dispatcher.register(this.actionsHandler.bind(this));

        userStore.on(UserStoreEvents.PROFILE_REQUEST_SUCCESS, () => this.handlePostsRequestAction());
    }

    init() {
        this.handlePostsRequestAction();
    }

    getState() {
        return this.posts;
    }

    setState(updater) {
        this.posts = updater;

        this.emit('changed', updater);
    }

    actionsHandler(action) {
        switch (action.type) {
            case UserActions.NEW_POST:
                this.handleNewPostAction(action.data);
                break;

            case UserActions.POSTS_REQUEST:
                this.handlePostsRequestAction(action.data);
                break;

            case UserActions.LIKE_POST:
                this.handleLikePostAction(action.data);
                break;

            default:
                return;
        }
    }

    handleNewPostAction(data) {
        const formData = new FormData();

        data.attached.forEach((file, i) => {
            formData.append(`imgContent${i}`, file, file.name);
        });

        formData.append('textPost', data.text);
        formData.append('date', data.date);

        this.sendAddPostRequest(formData)
            .then(response => {
                this.emit(PostStoreEvents.POST_ADD_SUCCESS);
                this.handlePostsRequestAction();
            })
            .catch(() => this.emit(PostStoreEvents.POST_ADD_FAILED));
    }

    handlePostsRequestAction() {
        this.getUserPosts()
            .then(posts => {
                this.setState(posts);
                this.emit(PostStoreEvents.POSTS_REQUEST_SUCCESS);
            })
            .catch(() => this.emit(PostStoreEvents.POSTS_REQUEST_FAILED));
    }

    handleLikePostAction(data) {
        this.changeLikePost(data.postId)
            .then(() => {
                this.emit(PostStoreEvents.POST_LIKE_SUCCESS, {postId: data.postId});
            });
    }

    async sendAddPostRequest(data) {
        return await http.post({url: '/posts/add', data, headers: {}})
    }

    async getUserPosts() {
        const userData = await http.get({url: '/profile'});
        const posts = userData.body['postsData'];
        let listPosts = [];
        for (const key in posts) {
            let imgUrls = [];
            posts[key].imgContent.forEach((img) => {
                img.Url = http.getHost() + img.Url;
                imgUrls.push(img.Url);
            });
            posts[key].imgContent = imgUrls;
            listPosts.push(posts[key]);
        }
        return listPosts.reverse();
    }

    async getNewsPosts() {
        let news = await http.get({url: '/posts'});

        return this.postsObjToList(news.body).map((item) => {
            let urlImg = http.getHost() + '/static/usersAvatar/';
            urlImg += item.imgAvatar ? item.imgAvatar : 'defaultUser.jpg';
            item.imgAvatar = urlImg;
            return item;
        });
    }

    async changeLikePost(postId) {
        return await http.post({url: `/like/post/${postId}`});
    }

    postsObjToList(posts) {
        let listPosts = []
        for (const key in posts) {
            let imgUrls = [];
            posts[key].imgContent.forEach((img) => {
                img.Url = http.getHost() + img.Url
                imgUrls.push(img.Url)
            })
            posts[key].imgContent = imgUrls
            listPosts.push(posts[key]);
        }
        return listPosts.reverse();
    }
}

makeObservable(PostStore);

const postStore = new PostStore();

export default postStore;
