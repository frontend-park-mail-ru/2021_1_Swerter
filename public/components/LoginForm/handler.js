(function () {
    function goLogin() {
        application.innerHTML = loginpageTemplate();
    }

    function submitLoginForm() {
        login = document.getElementsByName('login')[0];
        password = document.getElementsByName('password')[0];

        if (login.checkValidity() === true && password.checkValidity() === true) {
            const data = {
                login: login.value,
                password: password.value
            };

            sendLoginRequest(data);
        }

    }

    function displayLoginFormValidationError() {
        if (Array.from(document.getElementsByClassName('login-form__div-error')).length === 0) {
            const sib = document.getElementsByClassName('login-form__div-item')[0];
            const par = sib.parentNode;
            let errorBox = document.createElement('div')
            errorBox.className = 'login-form__div-error';
            errorBox.innerHTML = '<h2>Неверный логин или пароль!</h2>';
            par.insertBefore(errorBox, sib);
        }
    }

    async function sendLoginRequest(data) {
        res = await http.post({url: '/login', data: JSON.stringify(data)})
        if (res.status === 200) {
            let user = window.profileData.userData;
            let profile = await http.get({url: '/profile'});
            let userInfo = profile.body
            user.firstName = userInfo.FirstName;
            user.lastName = userInfo.LastName;
            router.goProfile();
        } else if (res.status == 403) {
            displayLoginFormValidationError();
        }
    }

    window.router.register(goLogin);
    window.submitLoginForm = submitLoginForm;
})()