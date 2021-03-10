(function () {
    function goRegister() {
        console.log('Register')
        application.innerHTML = registerpageTemplate();
    }

    function submitRegisterForm() {
        login = document.getElementsByName('login')[0];
        password = document.getElementsByName('password')[0];
        passwordRepeat = document.getElementsByName('password-repeat')[0];
        firstName = document.getElementsByName('first-name')[0];
        lastName = document.getElementsByName('last-name')[0];

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
                lastName: lastName.value
            };

            sendRegisterRequest(data);
        }
    }

    function displayRegisterFormValidationError() {
        if (Array.from(document.getElementsByClassName('register-form__div-error')).length === 0) {
            const sib = document.getElementsByClassName('register-form__div-item')[0];
            const par = sib.parentNode;
            let errorBox = document.createElement('div')
            errorBox.className = 'register-form__div-error';
            errorBox.innerHTML = '<h2>Введенный логин занят!</h2>';
            par.insertBefore(errorBox, sib);
        }
    }

    async function sendRegisterRequest(data) {
        res = await http.post({url: '/register', data: data})

        if (res.status === 200) {
            router.goLogin();
        } else if (res.status === 403) {
            displayRegisterFormValidationError();
        }
    }

    window.router.register(goRegister);
    window.displayRegisterFormValidationError = displayRegisterFormValidationError;
    window.submitRegisterForm = submitRegisterForm;
})()