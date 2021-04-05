import {router} from '../../modules/router.js';
import {http} from '../../modules/http.js';

export function addLoginFormListeners() {
    document.getElementById('submit-go-register').addEventListener('click', function () {
        router.go('/register')
    });
    document.getElementById('submit-login-form').addEventListener('click', submitLoginForm);
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

    if (errorMsg === null) {
        const data = {
            login: login.value,
            password: password.value,
        };
        sendLoginRequest(data);
    } else {
        displayLoginFormValidationError(errorMsg);
    }
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

async function sendLoginRequest(data) {
    const res = await http.post({url: '/login', data: JSON.stringify(data)});
    if (res.status === 200) {
        router.go('/profile', profileData)
    } else if (res.status == 403) {
        displayLoginFormValidationError('Wrong login or password');
    }
}