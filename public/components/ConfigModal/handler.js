import {router} from '../../modules/router.js';
import {http} from '../../modules/http.js';

function addChangeLoginListeners() {
  document.getElementById('change-login-form__div-close').addEventListener('click', closeModal);
  document.getElementById('change-login-form__button-change-login').addEventListener('click', submitChangeLogin);
}

function addChangePassListeners() {
  document.getElementById('change-pass-form__div-close').addEventListener('click', closeModal);
  document.getElementById('change-pass-form__button-change-pass').addEventListener('click', submitChangePassword);
}

function closeModal() {
  profileData.userData.editCreds = false;
  profileData.userData.changeLogin = false;
  profileData.userData.changePassword = false;

  router.goProfile();
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

async function submitChangeLogin() {
  const loginEl = document.getElementById('input-new-login');
  const login = loginEl.value.replace(/<\/?[^>]+(>|$)/g, '');

  if (loginEl.checkValidity() !== true) {
    displayValidationError('input-new-login', 'Wrong login format');
    return;
  }

  const result = await http.post({
    url: '/profile',
    data: JSON.stringify({login}),
  });
  if (result.status === 200) {
    profileData.userData.changeLogin = false;
    router.goProfile({needUpdate: false});
  } else {
    displayValidationError('input-new-login',
      'Server error, try again' +
      ' later');
  }
}

async function submitChangePassword() {
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
  } else if (newPassword !== repNewPassword) {
    displayValidationError('input-old-password',
      'Passwords must match');
  } else {
    const result = await http.post({
      url: '/profile',
      data: JSON.stringify({
        'password': newPassword,
        oldPassword,
      }),
    });
    if (result.status === 200) {
      profileData.userData.changePassword = false;
      router.goProfile({needUpdate: false});
    } else if (result.status === 403) {
      displayValidationError('input-old-password',
        'Wrong password entered');
    }
  }
}

export {addChangeLoginListeners};
export {addChangePassListeners};
