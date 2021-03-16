(function () {
    function goRegister() {
        console.log('Register');
        application.innerHTML = registerpageTemplate();
    }

    function submitRegisterForm() {
        login = document.getElementsByName('login')[0];
        password = document.getElementsByName('password')[0];
        passwordRepeat = document.getElementsByName('password-repeat')[0];
        firstName = document.getElementsByName('first-name')[0];
        lastName = document.getElementsByName('last-name')[0];

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

        console.log(errorMsg);

        if (errorMsg === null) {
            const data = {
                login: login.value,
                password: password.value,
                firstName: firstName.value,
                lastName: lastName.value,
            }
            sendRegisterRequest(data);
        } else {
            displayRegisterFormValidationError(errorMsg);
        }
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

    async function sendRegisterRequest(data) {
        const resReg = await http.post(
            {url: '/register', data: JSON.stringify(data)});
        if (resReg.status === 200) {
            const resLogin = await http.post(
                {url: '/login', data: JSON.stringify(data)});
            if (resLogin.status == 200) {
                router.goProfile();
            }
        } else if (resReg.status === 403) {
            displayRegisterFormValidationError(
                'User with such login already exists');
        }
    }

    window.router.register(goRegister);
    window.displayRegisterFormValidationError = displayRegisterFormValidationError;
    window.submitRegisterForm = submitRegisterForm;
})();
