import {router} from '../../modules/router.js';

(function() {
  function goRegister() {
    console.log('Register');
    application.innerHTML = registerpageTemplate();
    document.getElementById('submit-register-form').addEventListener('click', submitRegisterForm );
  }
  function submitRegisterForm() {
    let login = document.getElementsByName('login')[0];
    let password = document.getElementsByName('password')[0];
    let passwordRepeat = document.getElementsByName('password-repeat')[0];
    let firstName = document.getElementsByName('first-name')[0];
    let lastName = document.getElementsByName('last-name')[0];

    if (login.checkValidity() === true &&
            password.checkValidity() === true &&
            passwordRepeat.checkValidity() === true &&
            firstName.checkValidity() === true &&
            lastName.checkValidity() === true &&
            password.value == passwordRepeat.value) {
      const data = {
        login: login.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
      };

      sendRegisterRequest(data);
    }
  }

  function displayRegisterFormValidationError() {
    if (Array.from(document.getElementsByClassName('register-form__div-error')).length === 0) {
      const sib = document.getElementsByClassName('register-form__div-item')[0];
      const par = sib.parentNode;
      const errorBox = document.createElement('div');
      errorBox.className = 'register-form__div-error';
      errorBox.innerHTML = '<h2>Введенный логин занят!</h2>';
      par.insertBefore(errorBox, sib);
    }
  }

  async function sendRegisterRequest(data) {
    let res = await http.post({url: '/register', data: JSON.stringify(data)});

    if (res.status === 200) {
      router.goLogin();
    } else if (res.status === 403) {
      displayRegisterFormValidationError();
    }
  }

  router.register(goRegister);
  window.displayRegisterFormValidationError = displayRegisterFormValidationError;
  window.submitRegisterForm = submitRegisterForm;
})();
