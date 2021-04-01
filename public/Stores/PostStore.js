import Dispatcher from '../dispatcher.js';
import Post from '../models/post.js';
import {http} from '../modules/http.js';
import {router} from '../modules/router.js';
import makeObservable from '../observable.js';


class PostStore {
  constructor() {
    this.contentPost = [];
    this.posts= [];
  }

  // async
  getAll() {
    // const userData = await http.get({url: '/profile'});
    // profileData.postsData = addMetaPosts(postsObjToList(userData.body['postsData']));
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
}

console.log(PostStore.prototype);
makeObservable(PostStore);
const postStore = new PostStore();

export default postStore;

Dispatcher.register('add-post', (details) => {
  postStore.addPost(details.newPostInfo);
  postStore.emit('post-added');
});

Dispatcher.register('add-content-post', (details) => {
  postStore.addContentPost(details.imgInfo);
  // Не по флаксу передавать инфу с событием
  postStore.emit('content-post-added', details.imgInfo.imgContentFile.name);
});

// function postsObjToList(posts) {
//   const listPosts = [];
//   for (const key in posts) {
//     posts[key].imgContent = posts[key].imgContent ? http.getHost() + posts[key].imgContent : '';
//     listPosts.push(posts[key]);
//   }
//   return listPosts.reverse();
// }
//
// function addMetaPosts(posts) {
//   return posts.map((item) => {
//     item.imgAvatar = profileData.userData.imgAvatar;
//     item.postCreator = profileData.userData.firstName + ' ' + profileData.userData.lastName;
//     return item;
//   });
// }
