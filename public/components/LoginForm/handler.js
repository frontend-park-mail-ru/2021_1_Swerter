(function () {
    function goRegister() {
        console.log('Register')
        application.innerHTML = registerpageTemplate();
    }

    function goLogin() {
        application.innerHTML = loginpageTemplate();
    }

    function validationInLoginPage() {
        loginValue = document.getElementById("input-login-login-page").value.replace(/<\/?[^>]+(>|$)/g, "");
        password = document.getElementById("input-password-login-page").value.replace(/<\/?[^>]+(>|$)/g, "");
        if (loginValue.length < 5 || loginValue.indexOf('@') === -1 || password.length < 5 ) {
            loginData.validForm = false
            router.goLogin();
        }
        else {
            window.http.post({url : "/login"}).then((response) => {
                console.log(response);
            })
        }
    }

    window.router.register(goRegister)
    window.router.register(goLogin)
    window.loginData = {
        validationInLoginPage : validationInLoginPage,
        validForm : true
    }
})()