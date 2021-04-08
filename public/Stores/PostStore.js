import Dispatcher from '../dispatcher.js';
import {http} from '../modules/http.js';
import makeObservable from '../observable.js';

class PostStore {
    constructor() {
        //Для картинок
        this.contentPost = [];

        //Первый раз подгружаем всё без таймаута
        this.bind('authorized', () => {
            this.getNewsPosts().then((posts) => {
                this.newsPosts = posts;
                this.emit('new-news');
            });
            this.getNewsInterval = setInterval(() => {
                this.getNewsPosts().then((posts) => {
                    this.newsPosts = posts;
                    this.emit('new-news');
                });
            }, 10000);
        })
    }

    async getUserPosts() {
        const userData = await http.get({url: '/profile'});
        const posts = userData.body['postsData'];
        return posts;
    }

    async getNewsPosts() {
        let news = await http.get({url: '/posts'});
        news = this.postsObjToList(news.body).map((item) => {
            let urlImg = http.getHost() + '/static/usersAvatar/';
            urlImg += item.imgAvatar ? item.imgAvatar : 'defaultUser.jpg';
            item.imgAvatar = urlImg;
            return item;
        });
        return news;
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

    postsObjToList(posts) {
        const listPosts = [];
        for (const key in posts) {
            posts[key].imgContent = posts[key].imgContent ? http.getHost() + posts[key].imgContent : '';
            listPosts.push(posts[key]);
        }
        return listPosts.reverse();
    }

    async changeLikePost(postId) {
        const response = await http.get({url: `/post/like/${postId}`});
        return response
    }
}

makeObservable(PostStore);
const postStore = new PostStore();

export default postStore;

Dispatcher.register('add-post', (details) => {
    postStore.addPost(details.newPostInfo).then(() => {
        postStore.getUserPosts().then((posts) => {
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

Dispatcher.register('logout', (details) => {
    clearInterval(postStore.getNewsInterval);
});

Dispatcher.register('like-change', (details) => {
    postStore.changeLikePost(details.postId).then((response) => {
        if (response.status === 200) {
            postStore.getUserPosts().then((posts) => {
                postStore.userPosts = posts
            })
            postStore.getNewsPosts().then((posts) => {
                postStore.newsPosts = posts
            })
            postStore.emit('like-changed');
        }
    })
});
