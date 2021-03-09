(function(){
    function goRegister() {
        console.log('Register')
        application.innerHTML = registerpageTemplate();
    }

    function submitRegisterForm() {
        const data = {
            login: document.getElementsByName('login')[0].value,
            password: document.getElementsByName('password')[0].value,
            firstName: document.getElementsByName('first-name')[0].value,
            lastName: document.getElementsByName('last-name')[0].value
        };

        sendRegisterRequest(data);
    }

    async function sendRegisterRequest(data) {
        let status = 200;
        await http.post({ url: '/register', data: data })
            .then((res) => { status = 200; })
            .catch((err) => { status = 400; });

        console.log(status)
        if (status === 200) {
            router.goLogin();
        }
    }

    window.submitRegisterForm = submitRegisterForm;
    window.router.register(goRegister);
})()