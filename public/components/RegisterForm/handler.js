import Dispatcher from "../../dispatcher.js";
import userStore from "../../Stores/UserStore.js";

userStore.bind('registered',(creds)=>{
    Dispatcher.dispatch('send-login-request', creds);
})

userStore.bind('registration-failed',()=>{
    displayRegisterFormValidationError('User with such login already exists');
})

export function addRegisterFormListeners() {
    document.getElementById('submit-register-form').addEventListener('click', submitRegisterForm);
}

function submitRegisterForm() {
    const login = document.getElementsByName('login')[0];
    const password = document.getElementsByName('password')[0];
    const passwordRepeat = document.getElementsByName('password-repeat')[0];
    const firstName = document.getElementsByName('first-name')[0];
    const lastName = document.getElementsByName('last-name')[0];
    console.log(login.value)
    let errorMsg = null;

    if (login.checkValidity() !== true) {
        errorMsg = 'Wrong login format';
    } else if (password.checkValidity() !== true) {
        errorMsg = 'Password must contain at least 8 symbols (digits and' +
            ' characters)';
    } else if (password.value !== passwordRepeat.value) {
        errorMsg = 'Passwords must match';
    } else if (firstName.checkValidity() !== true) {
        errorMsg = `Firstname can't be empty`;
    } else if (lastName.checkValidity() !== true) {
        errorMsg = `Lastname can't be empty`;
    }

    if (errorMsg) {
        displayRegisterFormValidationError(errorMsg);
        return
    }

    Dispatcher.dispatch('send-register-request', {
        login: login.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
    })
}

function displayRegisterFormValidationError(error) {
    if (Array.from(document.getElementsByClassName(
        'register-form__div-error')).length === 0) {
        const sib = document.getElementsByClassName(
            'register-form__div-item').item(0);
        const par = sib.parentNode;
        const errorBox = document.createElement('div');
        errorBox.className = 'register-form__div-error';
        errorBox.innerHTML = `<h2>${error}</h2>`;
        par.insertBefore(errorBox, sib);
    } else {
        const errorBox = document.getElementsByClassName('register-form__div-error').item(0);
        errorBox.innerHTML = `<h2>${error}</h2>`;
    }
}