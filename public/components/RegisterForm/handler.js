(function () {
    function goRegister() {
        console.log('Register')
        application.innerHTML = registerpageTemplate();
    }

    function submitRegisterForm() {
        loginValue = document.getElementById("input-login-register-page").value.replace(/<\/?[^>]+(>|$)/g, "");
        password1 = document.getElementById("input-password-1-register-page").value.replace(/<\/?[^>]+(>|$)/g, "");
        password2 = document.getElementById("input-password-2-register-page").value.replace(/<\/?[^>]+(>|$)/g, "");
        name = document.getElementById("input-name-register-page").value.replace(/<\/?[^>]+(>|$)/g, "");
        surname = document.getElementById("input-surname-register-page").value.replace(/<\/?[^>]+(>|$)/g, "");

        if (loginValue.length < 5 || loginValue.indexOf('@') === -1 || password1.length < 5 ||
            password1 !== password2 || name === '' || surname === '') {
            registerData.validForm = false
            router.goRegister();
            return
        }

        const data = {
            login: loginValue,
            password: password1,
            firstName: name,
            lastName: surname
        };

        sendRegisterRequest(data);
    }

    async function sendRegisterRequest(data) {
        res = await http.post({url: '/register', data: data})

        if (res.status === 200) {
            registerData.validForm = true
            loginData.validForm = true
            router.goLogin();
        }
    }

    window.router.register(goRegister);
    window.registerData = {
        submitRegisterForm : submitRegisterForm,
        validForm : true
    }
})()