(function () {
    function goRegister() {
        console.log('Register')
        application.innerHTML = registerpageTemplate();
    }

    window.router.goRegister = goRegister;
})()