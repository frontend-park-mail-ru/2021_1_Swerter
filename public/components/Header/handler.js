import {router} from '../../modules/router.js';
import {http} from '../../modules/http.js';
import profilePage from "../../view/Profile/ProfilePage.js";
import Dispatcher from "../../dispatcher.js";
import userStore from "../../Stores/UserStore.js";

userStore.bind('friend-page-getted', ()=> {
    profilePage.emit('friend-profile')
})

export function addHeaderListeners() {
    document.getElementById('logout-block').addEventListener('click', sendLogoutRequest);
    document.getElementById('header__edit-creds').addEventListener('click', editCreds);
    document.getElementById('friends-block').addEventListener('click', ()=>{
        Dispatcher.dispatch('go-friend-profile', {});
    });
    if (profilePage.state.viewState.editCreds) {
        document.getElementById('header__change-login').addEventListener('click', changeLogin);
        document.getElementById('header__change-password').addEventListener('click', changePassword);
    }
}

async function sendLogoutRequest() {
    const res = await http.post({url: '/logout'});

    if (res.status === 200) {
        console.log('lo')
        router.go('/login')
    }
}

function editCreds() {
    profilePage.emit('modal-creds-opened');
}

function changePassword() {
    profilePage.emit('password-changed-opened');
}

function changeLogin() {
    profilePage.emit('login-changed-opened');
}

