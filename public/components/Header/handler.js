import {router} from '../../modules/router.js';
import {http} from '../../modules/http.js';
import {addProfileHeaderListener} from '../ProfileHeader/handler.js';
import {addCreatePostListeners} from '../AddPost/handler.js';

function addHeaderListeners() {
  document.getElementById('news-block').addEventListener('click', goNews);
  document.getElementById('friends-block').addEventListener('click', goFriends);
  document.getElementById('logout-block').addEventListener('click', sendLogoutRequest);
  document.getElementById('profile-block').addEventListener('click', function() {
    goProfile();
  });
}

function addProfileListeners() {
  addHeaderListeners();
  addCreatePostListeners();
  addProfileHeaderListener();
}

function addNewsListeners() {
  addHeaderListeners();
}

function addFriendsListeners() {
  addHeaderListeners();
}

async function goProfile(arg = {needUpdate: true}) {
  if (!arg.needUpdate) {
    profileData.postsData = addMetaPosts(profileData.postsData);
    application.innerHTML = profileTemplate(profileData);
    addProfileListeners();
    return;
  }
  const user = await http.get({url: '/profile'});
  console.log(user);
  if (user.status === 200) {
    profileData.userData.login = user.body['login'];
    profileData.userData.firstName = user.body['firstName'];
    profileData.userData.lastName = user.body['lastName'];

    profileData.userData.imgAvatar = http.getHost() + '/static/usersAvatar/';
    profileData.userData.imgAvatar += user.body['avatar'] ? user.body['avatar'] : 'defaultUser.jpg';
    window.userAvatar = profileData.userData.imgAvatar;

    profileData.postsData = addMetaPosts(postsObjToList(user.body['postsData']));
    console.log(profileData.postsData);
    profileData.userData.myPage = true;
  } else {
    console.log(user.status);
    router.goLogin();
    return;
  }
  console.log(profileData.postsData);
  application.innerHTML = profileTemplate(profileData);
  addProfileListeners();
}

async function goFriends() {
  const user = await http.get({url: '/profile/id2'});
  if (user.status === 200) {
    profileData.userData.firstName = user.body['firstName'];
    profileData.userData.lastName = user.body['lastName'];
    profileData.postsData = addMetaPosts(postsObjToList(user.body['postsData']));
    profileData.userData.imgAvatar = http.getHost() + '/static/usersAvatar/';
    profileData.userData.imgAvatar += user.body['avatar'] ? user.body['avatar'] : 'defaultUser.jpg';
    profileData.userData.myPage = false;
  }

  application.innerHTML = profileTemplate(profileData);
  addFriendsListeners();
}

async function goNews() {
  const data = await http.get({url: '/posts'});
  console.log(data);
  postsData = postsObjToList(data.body).map((item) => {
    let urlImg = http.getHost() + '/static/usersAvatar/';
    urlImg += item.imgAvatar ? item.imgAvatar : 'defaultUser.jpg';
    item.imgAvatar = urlImg;
    return item;
  });

  application.innerHTML = newsfeedTemplate(postsData);
  addNewsListeners();
}

function postsObjToList(posts) {
  const listPosts = [];
  for (let key in posts) {
    posts[key].imgContent = posts[key].imgContent ? http.getHost() + posts[key].imgContent : '';
    listPosts.push(posts[key]);
  }
  return listPosts.reverse();
}

function addMetaPosts(posts) {
  return posts.map((item) => {
    item.imgAvatar = profileData.userData.imgAvatar;
    item.postCreator = profileData.userData.firstName + ' ' + profileData.userData.lastName;
    return item;
  });
}

async function sendLogoutRequest() {
  let res = await http.post({url: '/logout'});

  if (res.status === 200) {
    router.goLogin();
  }
}

router.register(goProfile);
router.register(goNews);
router.register(goFriends);

