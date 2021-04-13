import userStore from '../../Stores/UserStore.js';
import profilePage from '../../view/Profile/ProfilePage.js';
import Dispatcher from '../../dispatcher.js';

userStore.bind('friend-page-received', ()=> {
  profilePage.emit('friend-page-received');
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
}
