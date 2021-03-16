import {router} from '../../modules/router.js';

(function() {
  function goLogin() {
    application.innerHTML = loginpageTemplate();
    document.getElementById('submit-go-register').addEventListener('click', function() {
      router.goRegister();
    });
    document.getElementById('submit-login-form').addEventListener('click', submitLoginForm);
  }

  function submitLoginForm() {
    const login = document.getElementsByName('login')[0];
    const password = document.getElementsByName('password')[0];

    if (login.checkValidity() === true && password.checkValidity() === true) {
      const data = {
        login: login.value,
        password: password.value,
      };

      sendLoginRequest(data);
    }
  }

  function displayLoginFormValidationError() {
    if (Array.from(document.getElementsByClassName('login-form__div-error')).length === 0) {
      const sib = document.getElementsByClassName('login-form__div-item')[0];
      const par = sib.parentNode;
      const errorBox = document.createElement('div');
      errorBox.className = 'login-form__div-error';
      errorBox.innerHTML = '<h2>Неверный логин или пароль!</h2>';
      par.insertBefore(errorBox, sib);
    }
  }

  async function sendLoginRequest(data) {
    const res = await http.post({url: '/login', data: JSON.stringify(data)});
    if (res.status === 200) {
      router.goProfile();
    } else if (res.status == 403) {
      displayLoginFormValidationError();
    }
  }

  function goRegister() {
    router.goRegister();
  }

  router.register(goLogin);
  window.submitLoginForm = submitLoginForm;
})();
