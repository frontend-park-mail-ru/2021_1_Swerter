import Dispatcher from '../dispatcher.js';
import Post from '../models/post.js';
import {router} from '../modules/router.js';
import {http} from '../modules/http.js';

class PostStore {
  constructor() {
    this.contentPost = [];
    this.listeners= {};
    this.posts= [];
  }

  getAll() {
    return [...this.posts];
  }

  addContentPost(imgInfo) {
    this.contentPost.push(imgInfo.imgContentFile);
    this.contentUrl = URL.createObjectURL(imgInfo.imgContentFile);
  }

  delContent() {
    this.contentUrl = '';
    this.contentPost = [];
  }

  addPost(newPostInfo) {
    this.addFrontendPost(newPostInfo);
    this.addBackendPost(newPostInfo);
    this.delContent();
    console.log(this);
  }

  addFrontendPost(newPostInfo) {
    const newPost = new Post(newPostInfo);
    if (this.contentUrl) {
      newPost.addContent(this.contentUrl);
    }
    postStore.posts.push(newPost);
    profileData.postsData = postStore.getAll().reverse();
    router.goProfile({needUpdate: false});
  }

  addBackendPost(newPostInfo) {
    const formData = new FormData();
    // Пока для 1, дальше расширим на несколько фоток в посте
    const imgContent = this.contentPost[0];
    if (imgContent) {
      formData.append('imgContent', imgContent, imgContent.name);
    }
    formData.append('textPost', newPostInfo.textPost);
    formData.append('date', newPostInfo.date);
    http.post({url: '/posts/add', data: formData, headers: {}});
  }

  bind(event, callback) {
    console.log(this.listeners[event]);
    if (!this.listeners[event]) {
      this.listeners[event] = [callback];
      return;
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    this.listeners[event] = this.listeners[event]
        .filter(function(listener) {
          return listener !== callback;
        });
  }

  emit(event, data) {
    this.listeners[event].forEach((listener)=>{
      listener(data);
    });
  }
}

const postStore = new PostStore();


Dispatcher.register('add-post', (details) => {
  postStore.addPost(details.newPostInfo);
  postStore.emit('post-added');
});

Dispatcher.register('add-content-post', (details) => {
  postStore.addContentPost(details.imgInfo);
  postStore.emit('content-post-added', details.imgInfo.imgContentFile.name);
});

export default postStore;
