import Dispatcher from '../../dispatcher.js';
import friendsStore from '../../Stores/FriendStore.js';
import profilePage from '../../view/Profile/ProfilePage.js';
import userStore from '../../Stores/UserStore.js';

friendsStore.bind('added-new-friend', () => {
  Dispatcher.dispatch('go-friends-page', {});
})

friendsStore.bind('canceled-friend-request', () => {
  Dispatcher.dispatch('go-friends-page', {});
})

userStore.bind('friend-page-received', ()=> {
  profilePage.emit('friend-page-received');
})

export function addFriendsRequestListeners() {
  const addFriendIds = document.querySelectorAll('[id^="add-friend-"]')
  addFriendIds.forEach((item)=> {
  item.addEventListener('click', () => {
          const chanks = item.id.split('-')
          let friendID = chanks[chanks.length - 1]
          console.log(friendID)
          Dispatcher.dispatch('access-friend-request', {
            id : parseInt(friendID)
          })
  });
  });

  const removeFriendIds = document.querySelectorAll('[id^="remove-friend-"]')
  removeFriendIds.forEach((item)=> {
  item.addEventListener('click', () => {
          const chanks = item.id.split('-')
          let friendID = chanks[chanks.length - 1]
          console.log(friendID)
          Dispatcher.dispatch('cancel-friend-request', {
            id : parseInt(friendID)
          })
  });
  });

  const usersIds = document.querySelectorAll('[id^="frb-friend-"]')
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

