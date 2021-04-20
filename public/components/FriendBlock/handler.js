import userStore from '../../Stores/UserStore.js';
import profilePage from '../../view/Profile/ProfilePage.js';
import Dispatcher from '../../modules/dispatcher.js';
import friendStore from '../../Stores/FriendStore.js';

userStore.bind('friend-page-received', ()=> {
  profilePage.emit('friend-page-received');
})

friendStore.bind('searched-friend-add', ()=> {
  Dispatcher.dispatch('search-friend', null);
})

export function addFriendsListeners() {
  const usersIds = document.querySelectorAll('[id^="fb-friend-"]')
  usersIds.forEach((item)=> {
    item.addEventListener('click', () => {
      const chanks = item.id.split('-')
      let friendID = chanks[chanks.length - 1]
      console.log(friendID)
      Dispatcher.dispatch('go-friend-profile', {
        id : parseInt(friendID)
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
