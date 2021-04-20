import Dispatcher from "../../modules/dispatcher.js";
import userStore from "../../Stores/UserStore.js";
import loginPage from "../../view/LoginPage/LoginPage.js";
import profilePage from '../../view/Profile/ProfilePage.js';

userStore.bind('send-login-request-failed', ()=>{
    displayLoginFormValidationError('Wrong login or password');
});

//6
userStore.bind('authorized', ()=>{
    loginPage.emit('authorized');
    //7
    profilePage.emit('authorized');
});

//1
export function addLoginFormListeners() {
    document.getElementById('submit-login-form').addEventListener('click', submitLoginForm);//2
}

function submitLoginForm() {
    const login = document.getElementsByName('login')[0];
    const password = document.getElementsByName('password')[0];

    let errorMsg = null;
    if (login.checkValidity() !== true) {
        errorMsg = 'Wrong login format';
    } else if (password.checkValidity() !== true) {
        errorMsg = 'Wrong password format';
    }
    if (errorMsg) {
        displayLoginFormValidationError(errorMsg);
        return
    }
    //3
    Dispatcher.dispatch('send-login-request',{
        login: login.value,
        password: password.value,
    })
}

function displayLoginFormValidationError(error) {
    if (Array.from(document.getElementsByClassName('login-form__div-error')).length === 0) {
        const sib = document.getElementsByClassName('login-form__div-item')[0];
        const par = sib.parentNode;
        const errorBox = document.createElement('div');
        errorBox.className = 'login-form__div-error';
        errorBox.innerHTML = `<h2>${error}</h2>`;
        par.insertBefore(errorBox, sib);
    } else {
        const errorBox = document.getElementsByClassName('login-form__div-error').item(0);
        errorBox.innerHTML = `<h2>${error}</h2>`;
    }
}
