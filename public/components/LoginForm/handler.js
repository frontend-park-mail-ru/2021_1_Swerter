(function () {
    function goLogin() {
        application.innerHTML = loginpageTemplate();
    }

    function submitLoginForm() {
        loginValue = document.getElementById("input-login-login-page").value.replace(/<\/?[^>]+(>|$)/g, "");
        password = document.getElementById("input-password-login-page").value.replace(/<\/?[^>]+(>|$)/g, "");
        if (loginValue.length < 5 || loginValue.indexOf('@') === -1 || password.length < 5 ) {
            loginData.validForm = false
            loginData.errMessage = "Невалидные данные"
            router.goLogin();
            return
        }
        const data = {
            login: loginValue,
            password: password
        };

        sendLoginRequest(data);
    }

    async function sendLoginRequest(data) {
        res = await http.post({ url: '/login', data: data })
        if (res.status === 200) {
            let user = window.profileData.userData;
            let profile = await http.get({url:'/profile'});
            let userInfo = profile.body
            user.firstName = userInfo.FirstName;
            user.lastName = userInfo.LastName;
            router.goProfile();
        } else if (res.status == 403) {
            loginData.validForm = false
            loginData.errMessage = "Неверный логин или пароль"
            router.goLogin();
        }
    }

    window.router.register(goLogin);
     window.loginData = {
         submitLoginForm : submitLoginForm,
         validForm : true,
         errMessage : "Невалидные данные"
    }
})()