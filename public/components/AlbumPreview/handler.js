import userStore from '../../Stores/UserStore.js';
import profilePage from '../../view/Profile/ProfilePage.js';
import Dispatcher from '../../modules/dispatcher.js';
import friendStore from '../../Stores/FriendStore.js';
import albumPage from '../../view/AlbumPage/AlbumPage.js'
import albumStore from '../../Stores/AlbumStore.js';

albumStore.bind('album-received', ()=> {
  albumPage.emit('album-received');
})

export function addAlbumsListeners() {
  const albumsIds = document.querySelectorAll('[id^="album-"]')
  albumsIds.forEach((item)=> {
    item.addEventListener('click', () => {
      const chanks = item.id.split('-')
      let albumID = chanks[chanks.length - 1]
      console.log(albumID)
      Dispatcher.dispatch('go-album-page', {
        id : parseInt(albumID)
      })
    });
  });


  const addFriendIds = document.querySelectorAll('[id^="add-new-friend-"]')
  addFriendIds.forEach((item)=> {
    item.addEventListener('click', () => {
      const chanks = item.id.split('-')
      let friendID = chanks[chanks.length - 1]
      console.log(friendID)
      Dispatcher.dispatch('send-friend-request', {
        id : parseInt(friendID)
      })
    });
  });
}
