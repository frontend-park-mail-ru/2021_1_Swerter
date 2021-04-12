import userStore from '../../Stores/UserStore.js';
import profilePage from '../../view/Profile/ProfilePage.js';
import Dispatcher from '../../dispatcher.js';
import friendStore from '../../Stores/FriendStore.js';
import friendPage from '../../view/FriendsPage/FriendsPage.js';

friendStore.bind('users-found', ()=> {
  friendPage.emit('friends-page-received');
})

export function addFriendsSearchListeners() {
  document.getElementById("search-friend-btn").addEventListener('click', searchFriend);
}

function searchFriend() {
  const inputText = document.getElementById("search-friend-input").value.replace(/<\/?[^>]+(>|$)/g, '').split(' ');
  let firstName, lastName = ""
  if (inputText.length >= 1) {
    firstName = inputText[0]
  }
  if (inputText.length >= 2) {
    lastName = inputText[1]
  }
  Dispatcher.dispatch('search-friend', {
    firstName,
    lastName,
  })
}
