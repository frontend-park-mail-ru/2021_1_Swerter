(function () {
    function validationInRegisterPage() {
        loginValue = document.getElementById("input-login-register-page").value.replace(/<\/?[^>]+(>|$)/g, "");
        password1 = document.getElementById("input-password-1-register-page").value.replace(/<\/?[^>]+(>|$)/g, "");
        password2 = document.getElementById("input-password-2-register-page").value.replace(/<\/?[^>]+(>|$)/g, "");
        name = document.getElementById("input-name-register-page").value.replace(/<\/?[^>]+(>|$)/g, "");
        surname = document.getElementById("input-surname-register-page").value.replace(/<\/?[^>]+(>|$)/g, "");
        if (loginValue.length < 5 || loginValue.indexOf('@') === -1 || password1.length < 5 ||
                password1 !== password2 || name === '' || surname === '') {
            registerData.validForm = false
            router.goRegister();
        }
        else {
            window.http.post({url : "/login"}).then((response) => {
                console.log(response);
            })
        }
    }

    window.registerData = {
        validationInRegisterPage : validationInRegisterPage,
        validForm : true
    }
})()