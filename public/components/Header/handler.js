import {router} from '../../modules/router.js';
import {http} from '../../modules/http.js';

export function addHeaderListeners() {
    document.getElementById('logout-block').addEventListener('click', sendLogoutRequest);
    document.getElementById('header__edit-creds').addEventListener('click', editCreds);
    if (profileData.userData.editCreds) {
        document.getElementById('header__change-login').addEventListener('click', changeLogin);
        document.getElementById('header__change-password').addEventListener('click', changePassword);
    }
    document.getElementById('profile-block').addEventListener('click', function () {
        //отсавил от роутера только это
        goProfile();
    });
}


async function goProfile(arg = {needUpdate: true}) {

    if (!arg.needUpdate) {
        profileData.postsData = addMetaPosts(profileData.postsData);
        router.go('/profile', profileData)
        return;
    }

    const user = await http.get({url: '/profile'});
    if (user.status === 200) {
        profileData.userData.login = user.body['login'];
        profileData.userData.firstName = user.body['firstName'];
        profileData.userData.lastName = user.body['lastName'];

        profileData.userData.imgAvatar = http.getHost() + '/static/usersAvatar/';
        profileData.userData.imgAvatar += user.body['avatar'] ? user.body['avatar'] : 'defaultUser.jpg';
        window.userAvatar = profileData.userData.imgAvatar;

        profileData.userData.myPage = true;
        // profileData.postsData = addMetaPosts(postsObjToList(user.body['postsData']));
    } else {
        router.go('/login')
        return;
    }

    router.go('/profile', profileData)
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
        profileData.userData.modEdited = false;
    }
    application.innerHTML = profileTemplate(profileData);
}

async function goNews() {
    const data = await http.get({url: '/posts'});
    postsData = postsObjToList(data.body).map((item) => {
        let urlImg = http.getHost() + '/static/usersAvatar/';
        urlImg += item.imgAvatar ? item.imgAvatar : 'defaultUser.jpg';
        item.imgAvatar = urlImg;
        return item;
    });

    application.innerHTML = newsfeedTemplate(postsData);
}

function postsObjToList(posts) {
    const listPosts = [];
    for (const key in posts) {
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
    const res = await http.post({url: '/logout'});

    if (res.status === 200) {
        console.log('lo')
        router.go('/login')
    }
}

function editCreds() {
    profileData.userData.editCreds = !profileData.userData.editCreds;
    router.go('/profile', profileData)
}

function changePassword() {
    profileData.userData.changePassword = true;
    router.go('/profile', profileData)
}

function changeLogin() {
    profileData.userData.changeLogin = true;
    router.go('/profile', profileData)
}

