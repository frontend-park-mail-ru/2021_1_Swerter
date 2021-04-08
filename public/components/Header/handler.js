import profilePage from "../../view/Profile/ProfilePage.js";
import Dispatcher from "../../dispatcher.js";
import userStore from "../../Stores/UserStore.js";

userStore.bind('friend-page-getted', ()=> {
    profilePage.emit('friend-page-getted');
})

userStore.bind('profile-getted', ()=> {
    profilePage.emit('profile-getted')
})

userStore.bind('logouted', ()=> {
    profilePage.emit('logouted');
})

export function addHeaderListeners() {
    document.getElementById('logout-block').addEventListener('click', sendLogoutRequest);
    document.getElementById('header__edit-creds').addEventListener('click', editCreds);
    document.getElementById('profile-block').addEventListener('click', ()=>{
        Dispatcher.dispatch('get-user-profile', {});
    });
    document.getElementById('friends-block').addEventListener('click', ()=>{
        //Переход на страницу человека
        Dispatcher.dispatch('go-friend-profile', {});
    });
    if (profilePage.state.viewState.editCreds) {
        document.getElementById('header__change-login').addEventListener('click', changeLogin);
        document.getElementById('header__change-password').addEventListener('click', changePassword);
    }
}

async function sendLogoutRequest() {
    Dispatcher.dispatch('logout',{});
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

