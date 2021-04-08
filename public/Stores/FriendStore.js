import Dispatcher from '../dispatcher.js';
import {http} from '../modules/http.js';
import makeObservable from '../observable.js';
import postStore from "./PostStore.js";

class FriendStore {

  constructor() {
    this.friends = []
  }

  async getProfileFriends() {
    const response = await http.get({url: '/user/friends'})
    const friendData = response.body
    return friendData
  }

  async getProfileFriend(id) {
    const response = await http.get({url: `/profile/id${id}`});
    console.log(`/profile/${id}`)
    const userData = response.body;
    return userData;
  }

  setFriendsData(friendsData) {
    friendsData.forEach((friend) => {
      let saveFriend = {}
      saveFriend.id = friend["friend"]["id"]
      saveFriend.avatar = http.getHost() + '/static/usersAvatar/'
      saveFriend.avatar += friend["friend"]["avatar"] ?
        friend["friend"]["avatar"] :
        'defaultUser.jpg'
      saveFriend.firstName = friend["friend"]["firstName"]
      saveFriend.lastName = friend["friend"]["lastName"]
      this.friends.push(saveFriend)
    })
  }

}

makeObservable(FriendStore);
const friendStore = new FriendStore();


Dispatcher.register('go-friends-page', () => {
  //Хардкодим айди второго пользователя
  friendStore.getProfileFriend(1).then((userData) => {
    friendStore.setUserData(userData);
    console.log(userData)
    friendStore.emit('friend-page-getted');
  });
});

Dispatcher.register('go-friend-profile', () => {
  //Хардкодим айди второго пользователя
  console.log("huyak")
  friendStore.getProfileFriends().then((friendsData) => {
    friendStore.setFriendsData(friendsData);
    friendStore.emit('friends-page-getted');
  });
});


export default friendStore;
