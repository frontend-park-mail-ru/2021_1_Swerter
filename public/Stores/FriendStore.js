import Dispatcher from '../dispatcher.js';
import {http} from '../modules/http.js';
import makeObservable from '../observable.js';
import postStore from './PostStore.js';

class FriendStore {

  constructor() {
    this.state = {
      friends: [],
      followers: [],
    };
  }

  async getProfileFriends() {
    const response = await http.get({url: '/user/friends'});
    const friendsData = response.body;
    return friendsData;
  }

  async addFriend(details) {
      const response = await http.post({
        url: '/user/friend/add',
        data: JSON.stringify(details),
        headers: {}
      });
      return response;
    }

  async getProfileFollowers() {
    const response = await http.get({url: '/user/followers'});
    const followersData = response.body;
    return followersData;
  }

  async getProfileFriend(id) {
    const response = await http.get({url: `/profile/id${id}`});
    console.log(`/profile/${id}`);
    const userData = response.body;
    return userData;
  }

  clearFriendsData() {
    this.state.friends = []
  }

  clearFollowersData() {
    this.state.followers = []
  }

  setFriendsData(friendsData) {
    this.clearFriendsData();
    friendsData.forEach((friend) => {
      let saveFriend = {};
      saveFriend.id = friend['id'];
      saveFriend.avatar = http.getHost() + '/static/usersAvatar/';
      saveFriend.avatar += friend['avatar'] ?
        friend['avatar'] :
        'defaultUser.jpg';
      saveFriend.firstName = friend['firstName'];
      saveFriend.lastName = friend['lastName'];
      this.state.friends.push(saveFriend);
    });
  }

  setFollowersData(followersData) {
    this.clearFollowersData();
    followersData.forEach((follower) => {
      let saveFollower = {};
      saveFollower.id = follower['id'];
      saveFollower.avatar = http.getHost() + '/static/usersAvatar/';
      saveFollower.avatar += follower['avatar'] ?
        follower['avatar'] :
        'defaultUser.jpg';
      saveFollower.firstName = follower['firstName'];
      saveFollower.lastName = follower['lastName'];
      this.state.followers.push(saveFollower);
    });
  }

}

makeObservable(FriendStore);
const friendStore = new FriendStore();

Dispatcher.register('access-friend-request', (details) => {
  friendStore.addFriend(details).then((response) => {
    friendStore.emit('added-new-friend');
  })
});

Dispatcher.register('go-friends-page', () => {
  (async function () {
    const friendsData = await friendStore.getProfileFriends();
    friendStore.setFriendsData(friendsData);

    const followersData = await friendStore.getProfileFollowers()
    friendStore.setFollowersData(followersData);
  })().then(()=>{
    console.log(friendStore.state)
    friendStore.emit('friends-page-received');
  });
});

// Dispatcher.register('go-friend-profile', () => {
//   //Хардкодим айди второго пользователя
//   friendStore.getProfileFriend(1).then((userData) => {
//     friendStore.setUserData(userData);
//     console.log(userData);
//     friendStore.emit('friend-page-getted');
//   });
//
// });


export default friendStore;
