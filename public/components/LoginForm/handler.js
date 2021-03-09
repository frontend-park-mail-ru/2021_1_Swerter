(function () {
    function goRegister() {
        console.log('Register')
        application.innerHTML = registerpageTemplate();
    }

    function goLogin() {
        console.log('Login')
        application.innerHTML = loginpageTemplate();
    }

    window.router.register(goRegister)
    window.router.register(goLogin)
})()