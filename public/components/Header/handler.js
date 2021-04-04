import {router} from '../../modules/router.js';
import {http} from '../../modules/http.js';
import profilePage from "../../view/Profile/ProfilePage.js";
import Dispatcher from "../../dispatcher.js";
import userStore from "../../Stores/UserStore.js";

export function addHeaderListeners() {
    document.getElementById('logout-block').addEventListener('click', sendLogoutRequest);
    document.getElementById('header__edit-creds').addEventListener('click', editCreds);
    document.getElementById('friends-block').addEventListener('click', ()=>{
        Dispatcher.dispatch('go-friend-profile', {});
    });
    if (profileData.userData.editCreds) {
        document.getElementById('header__change-login').addEventListener('click', changeLogin);
        document.getElementById('header__change-password').addEventListener('click', changePassword);
    }
    userStore.bind('friend-page-getted', ()=> {
        profilePage.emit('friend-profile')
    })
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

