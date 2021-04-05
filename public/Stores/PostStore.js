import Dispatcher from '../dispatcher.js';
import {http} from '../modules/http.js';
import makeObservable from '../observable.js';

class PostStore {
    constructor() {
        this.contentPost = [];
        this.getUserPosts().then((posts) => {
            this.userPosts = posts;
            this.emit('init-user-posts');
        });

        this.getNewsPosts().then((posts) => {
            this.newsPosts = posts;
            this.emit('init-news');
        });
    }

    async getUserPosts() {
        const userData = await http.get({url: '/profile'});
        const posts = userData.body['postsData'];
        return posts;
    }

    async getNewsPosts() {
        const news = await http.get({url: '/posts'});
        return news.body;
    }

    addContentPost(imgInfo) {
        this.contentPost.push(imgInfo.imgContentFile);
    }

    delContent() {
        this.contentPost = [];
    }

    addPost(newPostInfo) {
        const formData = new FormData();
        const imgContent = this.contentPost[0];
        if (imgContent) {
            formData.append('imgContent', imgContent, imgContent.name);
        }
        formData.append('textPost', newPostInfo.textPost);
        formData.append('date', newPostInfo.date);
        const response = http.post({url: '/posts/add', data: formData, headers: {}});
        this.delContent();
        return response;
    }

}

console.log(PostStore.prototype);
makeObservable(PostStore);
const postStore = new PostStore();

export default postStore;

Dispatcher.register('add-post', (details) => {
    postStore.addPost(details.newPostInfo).then(()=> {
        postStore.getUserPosts().then((posts)=>{
            postStore.userPosts = posts
            postStore.emit('post-added');
        })
    })
});

Dispatcher.register('add-content-post', (details) => {
    postStore.addContentPost(details.imgInfo);
    // Не по флаксу передавать инфу с событием
    postStore.emit('content-post-added', details.imgInfo.imgContentFile.name);
});


