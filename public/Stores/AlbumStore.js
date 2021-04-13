import Dispatcher from '../dispatcher.js';
import {http} from '../modules/http.js';
import makeObservable from '../observable.js';

class AlbumStore {
  constructor() {
    //Для картинок
    this.contentAlbum = [];
  }


  getUrlsContent() {
    return this.contentAlbum.map(img => URL.createObjectURL(img))
  }


  // async getNewsPosts() {
  //   let news = await http.get({url: '/posts'});
  //   news = this.postsObjToList(news.body).map((item) => {
  //     let urlImg = http.getHost() + '/static/usersAvatar/';
  //     urlImg += item.imgAvatar ? item.imgAvatar : 'defaultUser.jpg';
  //     item.imgAvatar = urlImg;
  //     return item;
  //   });
  //   return news;
  // }

  addPhotoToAlbum(imgInfo) {
    this.contentAlbum.push(imgInfo.imgContentFile);
  }

  delContent() {
    this.contentPost = [];
  }

  // addPost(newPostInfo) {
  //   const formData = new FormData();
  //   const imgContent = this.contentPost[0];
  //   if (imgContent) {
  //     formData.append('imgContent', imgContent, imgContent.name);
  //   }
  //   formData.append('textPost', newPostInfo.textPost);
  //   formData.append('date', newPostInfo.date);
  //   const response = http.post({url: '/posts/add', data: formData, headers: {}});
  //   this.delContent();
  //   return response;
  // }

  postsObjToList(posts) {
    const listPosts = [];
    for (const key in posts) {
      posts[key].imgContent = posts[key].imgContent ? http.getHost() + posts[key].imgContent : '';
      listPosts.push(posts[key]);
    }
    return listPosts.reverse();
  }

  async changeLikePost(postId) {
    const response = await http.post({url: `/like/post/${postId}`});
    return response
  }
}

makeObservable(AlbumStore);
const albumStore = new AlbumStore();

export default albumStore;

// Dispatcher.register('add-post', (details) => {
//   postStore.addPost(details.newPostInfo).then(() => {
//     postStore.getUserPosts().then((posts) => {
//       postStore.userPosts = posts
//       console.log(posts)
//       postStore.emit('post-added');
//     })
//   })
// });

Dispatcher.register('add-photo-to-album', (details) => {
  albumStore.addPhotoToAlbum(details.imgInfo);
  albumStore.emit('album-content-loaded');
});

