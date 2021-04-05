import {router} from '../../modules/router.js';
import {http} from '../../modules/http.js';
import profilePage from "../../view/Profile/ProfilePage.js";
import Dispatcher from "../../dispatcher.js";
import userStore from "../../Stores/UserStore.js";

function addChangeLoginListeners() {
    document.getElementById('modal-config').addEventListener('click', closeModal);
    document.getElementById('change-login-form__div-close').addEventListener('click', closeModal);
    document.getElementById('change-login-form__button-change-login').addEventListener('click', submitChangeLogin);
    userStore.bind('new-login-setted', ()=>{
        profilePage.emit('modal-closed')
    });
    userStore.bind('new-password-setted', ()=>{
        profilePage.emit('modal-closed')
    });
    userStore.bind('new-login-failed', ()=>{
        displayValidationError('input-new-login',
            'Server error, try again' +
            ' later');
    });
    userStore.bind('new-password-failed', ()=>{
        displayValidationError('input-old-password',
            'Wrong password entered');
    });
}

function addChangePassListeners() {
    document.getElementById('modal-config').addEventListener('click', closeModal);
    document.getElementById('change-pass-form__div-close').addEventListener('click', closeModal);
    document.getElementById('change-pass-form__button-change-pass').addEventListener('click', submitChangePassword);
}

function closeModal() {
    profilePage.emit('modal-closed');
}

function submitChangeLogin() {
    const loginEl = document.getElementById('input-new-login');
    const login = loginEl.value.replace(/<\/?[^>]+(>|$)/g, '');

    if (loginEl.checkValidity() !== true) {
        displayValidationError('input-new-login', 'Wrong login format');
        return;
    }

    Dispatcher.dispatch('new-login',{
        login,
    })
}

function submitChangePassword() {
    const oldPasswordEl = document.getElementById('input-old-password');
    const oldPassword = oldPasswordEl.value.replace(/<\/?[^>]+(>|$)/g, '');

    const newPasswordEl = document.getElementById('input-new-password');
    const newPassword = newPasswordEl.value.replace(/<\/?[^>]+(>|$)/g, '');

    const repNewPasswordEl = document.getElementById('input-new-password-repeat');
    const repNewPassword = repNewPasswordEl.value.replace(/<\/?[^>]+(>|$)/g, '');

    if (oldPasswordEl.checkValidity() !== true || newPasswordEl.checkValidity() !== true
        || repNewPasswordEl.checkValidity() !== true) {
        displayValidationError('input-old-password', 'Wrong password' +
            ' format: password must contain' +
            ' at' +
            ' least 8 symbols (digits and characters)');
        return
    }
    if (newPassword !== repNewPassword) {
        displayValidationError('input-old-password',
            'Passwords must match');
        return
    }

    Dispatcher.dispatch('new-password',{
        password:newPassword,
        oldPassword,
    })
}


function displayValidationError(prev, error) {
    if (Array.from(
        document.getElementsByClassName('div-error')).length === 0) {
        const sib = document.getElementById(prev);
        const par = sib.parentNode;
        const errorBox = document.createElement('div');
        errorBox.className = 'div-error';
        errorBox.innerHTML = `<h2>${error}</h2>`;
        par.insertBefore(errorBox, sib);
    } else {
        const errorBox = document.getElementsByClassName('div-error')
            .item(0);
        errorBox.innerHTML = `<h2>${error}</h2>`;
    }
}

export {addChangeLoginListeners};
export {addChangePassListeners};
