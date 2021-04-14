import Dispatcher from '../dispatcher.js';
import {http} from '../modules/http.js';
import makeObservable from '../observable.js';


class AlbumStore {
  constructor() {
    //Для картинок
    this.contentAlbum = [];
  }


  getUrlsContent() {
    return this.contentAlbum.map(img => URL.createObjectURL(img));
  }

  ClearContent() {
    this.contentAlbum = []
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

  addAlbum(newAlbumInfo) {
    const formData = new FormData();
    const imgContent = this.contentAlbum[0];
    this.contentAlbum.forEach((content, i) => {
      formData.append(`imgContent${i}`, content, imgContent.name);
    });
    formData.append('albumTitle', newAlbumInfo.albumTitle);
    formData.append('albumDescription', newAlbumInfo.albumDescription);
    const response = http.post({url: '/album/add', data: formData, headers: {}});
    this.delContent();
    return response;
  }

  async getUserAlbums() {
    const userData = await http.get({url: '/profile'});
    const albums = userData.body['albumsData'];
    let listAlbums = [];
    for (const key in albums) {
      let imgUrls = [];
      albums[key].imgContent.forEach((img)=>{
        img.Url = http.getHost() + img.Url
        imgUrls.push(img.Url)
      })
      albums[key].imgContent = imgUrls
      listAlbums.push(albums[key]);
    }
    return listAlbums.reverse();
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
    const response = await http.post({url: `/like/post/${postId}`});
    return response;
  }
}

makeObservable(AlbumStore);
const albumStore = new AlbumStore();

export default albumStore;


Dispatcher.register('add-photo-to-album', (details) => {
  albumStore.addPhotoToAlbum(details.imgInfo);
  albumStore.emit('album-content-loaded');
});

Dispatcher.register('add-album', (details) => {
  albumStore.addAlbum(details.newAlbumInfo).then(() => {
    albumStore.getUserAlbums().then((albums) => {
      console.log(albums)
      albumStore.userAlbums = albums
      albumStore.emit('album-added');
      albumStore.ClearContent();
    })
  })
});


