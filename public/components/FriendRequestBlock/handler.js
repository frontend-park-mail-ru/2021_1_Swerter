import Dispatcher from '../../dispatcher.js';
import FriendStore from '../../Stores/FriendStore.js'
import FriendsPage from '../../view/FriendsPage/FriendsPage.js';

FriendStore.bind('added-new-friend', () => {
  Dispatcher.dispatch('go-friends-page', {});
})

export function addFriendsRequestListeners() {
  const ids = document.querySelectorAll('[id^="add-friend-"]')
  ids.forEach((item)=> {
  item.addEventListener('click', () => {
          const chanks = item.id.split('-')
          let friendID = chanks[chanks.length - 1]
          console.log(friendID)
          Dispatcher.dispatch('access-friend-request', {
            id : parseInt(friendID)
          })
  });
  });
}

// async function sendLogoutRequest() {
//   Dispatcher.dispatch('logout',{});
// }
