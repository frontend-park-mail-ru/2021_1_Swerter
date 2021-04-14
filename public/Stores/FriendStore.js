import Dispatcher from '../dispatcher.js';
import {http} from '../modules/http.js';
import makeObservable from '../observable.js';
import postStore from './PostStore.js';

class FriendStore {

  constructor() {
    this.state = {
      friends: [],
      followers: [],
      foundUsers: [],
      lastRequest: {
        firstName: "",
        lastName: ""
      }
    }
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

  async removeFriend(details) {
      const response = await http.post({
        url: '/user/friend/remove',
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

  async searchFriend(details) {
    const response = await http.get({
        url: `/user/friend/search?first_name=${details.firstName}&last_name=${details.lastName}`
    });
    const users = response.body;
    return users;
  }

  async getProfileFriend(id) {
    const response = await http.get({url: `/profile/id${id}`});
    const userData = response.body;
    return userData;
  }

  clearFriendsData() {
    this.state.friends = []
  }
  clearLastRequest() {
    this.state.lastRequest = {
        firstName: "",
        lastName: ""
      }
  }


  clearFollowersData() {
    this.state.followers = []
  }

  clearFoundUsers() {
    this.state.foundUsers = []
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

  setFoundUsers(users, lastRequest) {
    this.clearFoundUsers();
    if (lastRequest.firstName !== "") {
      this.state.lastRequest = lastRequest;
    }
    users.forEach((user) => {
      let saveUser = {};
      saveUser.id = user['id'];
      saveUser.avatar = http.getHost() + '/static/usersAvatar/';
      saveUser.avatar += user['avatar'] ?
        user['avatar'] :
        'defaultUser.jpg';
      saveUser.firstName = user['firstName'];
      saveUser.lastName = user['lastName'];
      saveUser.isFriend = user['isFriend']
      this.state.foundUsers.push(saveUser);
    })
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
      saveFollower.isNotified = follower['isNotified'];
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

Dispatcher.register('send-friend-request', (details) => {
  friendStore.addFriend(details).then((response) => {
    friendStore.emit('searched-friend-add');
  })
});

Dispatcher.register('cancel-friend-request', (details) => {
  friendStore.removeFriend(details).then((response) => {
    friendStore.emit('canceled-friend-request');
  })
});

Dispatcher.register('search-friend', (details) => {
  if (details === null)
    details = friendStore.state.lastRequest
  if (details.firstName === "" && details.lastName === "")
    return;

  friendStore.searchFriend(details).then((users) => {
    friendStore.setFoundUsers(users, details);
    friendStore.emit("users-found");
  });
});

Dispatcher.register('go-friends-page', () => {
  (async function () {
    const friendsData = await friendStore.getProfileFriends();
    friendStore.setFriendsData(friendsData);

    const followersData = await friendStore.getProfileFollowers()
    friendStore.setFollowersData(followersData);
  })().then(()=>{
    friendStore.clearLastRequest();
    friendStore.clearFoundUsers();
    friendStore.emit('friends-page-received');
  });
});


export default friendStore;
