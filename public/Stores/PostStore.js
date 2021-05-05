import {UserActions} from "../actions/UserActions.js";
import makeObservable from "../modules/observable.js";
import dispatcher from "../modules/dispatcher.js";
import {http} from "../modules/http.js";
import {PostStoreEvents} from "../consts/events.js";

class PostStore {
    constructor() {
        this.posts = [];
        this.dispatchToken = dispatcher.register(this.actionsHandler.bind(this));
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
        formData.

        this.sendAddPostRequest(formData)
            .then(response => this.emit(PostStoreEvents.POST_ADD_SUCCESS))
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
