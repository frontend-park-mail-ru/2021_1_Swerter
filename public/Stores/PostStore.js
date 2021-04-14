import Dispatcher from '../dispatcher.js';
import {http} from '../modules/http.js';
import makeObservable from '../observable.js';

class PostStore {
    constructor() {
        this.contentPost = [];

        this.bind('authorized', () => {
            this.getNewsPosts().then((posts) => {
                this.newsPosts = posts;
                this.emit('new-news');
                this.emit('init-news');
            });
            this.getNewsInterval = setInterval(() => {
                this.getNewsPosts().then((posts) => {
                    this.newsPosts = posts;
                    this.emit('new-news');
                });
            }, 10000);
        })
    }

    getUrlsContent() {
        return this.contentPost.map(img => URL.createObjectURL(img))
    }

    async getUserPosts() {
        const userData = await http.get({url: '/profile'});
        const posts = userData.body['postsData'];
        let listPosts = [];
        for (const key in posts) {
            let imgUrls = [];
            posts[key].imgContent.forEach((img)=>{
                img.Url = http.getHost() + img.Url
                imgUrls.push(img.Url)
            })
            posts[key].imgContent = imgUrls
            listPosts.push(posts[key]);
        }
        return listPosts.reverse();
    }

    async getNewsPosts() {
        let news = await http.get({url: '/posts'});

        const posts = this.postsObjToList(news.body).map((item) => {
            let urlImg = http.getHost() + '/static/usersAvatar/';
            urlImg += item.imgAvatar ? item.imgAvatar : 'defaultUser.jpg';
            item.imgAvatar = urlImg;
            return item;
        });
        return posts;
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
        this.contentPost.forEach((content, i)=>{
            formData.append(`imgContent${i}`, content, imgContent.name);
        });
        formData.append('textPost', newPostInfo.textPost);
        formData.append('date', newPostInfo.date);
        const response = http.post({url: '/posts/add', data: formData, headers: {}});
        this.delContent();
        return response;
    }

    postsObjToList(posts) {
        let listPosts = []
        for (const key in posts) {
            let imgUrls = [];
            posts[key].imgContent.forEach((img)=>{
                img.Url = http.getHost() + img.Url
                imgUrls.push(img.Url)
            })
            posts[key].imgContent = imgUrls
            listPosts.push(posts[key]);
        }
        return listPosts.reverse();
    }

    ClearContent() {
        this.contentPost = []
    }

    DelImgFromNewPost(index) {
        this.contentPost.splice(index, 1);
    }

    async changeLikePost(postId) {
        const response = await http.post({url: `/like/post/${postId}`});
        return response
    }
}

makeObservable(PostStore);
const postStore = new PostStore();

export default postStore;


Dispatcher.register('clear-all-content', (details) => {
    postStore.ClearContent();
    postStore.emit('content-changed')
});


Dispatcher.register('del-img-from-post', (details) => {
    postStore.DelImgFromNewPost(details.imgId);
    postStore.emit('deleted-img-from-new-post')
});

Dispatcher.register('add-post', (details) => {
    postStore.addPost(details.newPostInfo).then(() => {
        postStore.getUserPosts().then((posts) => {
            postStore.userPosts = posts
            postStore.emit('post-added');
            postStore.ClearContent();
        })
    })
});

Dispatcher.register('add-content-post', (details) => {
    postStore.addContentPost(details.imgInfo);
    postStore.emit('content-changed')
});

Dispatcher.register('logout', (details) => {
    clearInterval(postStore.getNewsInterval);
});

Dispatcher.register('like-change', (details) => {
    postStore.changeLikePost(details.postId).then((response) => {
        if (response.status === 200) {
            postStore.getUserPosts().then((posts) => {
                postStore.userPosts = posts
                postStore.emit('like-changed');
            })
            postStore.getNewsPosts().then((posts) => {
                postStore.newsPosts = posts
                postStore.emit('like-changed');
            })
        }
    })
});
