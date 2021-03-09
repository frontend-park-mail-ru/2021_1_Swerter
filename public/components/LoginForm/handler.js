(function () {
    function goLogin() {
        console.log('Login')
        application.innerHTML = loginpageTemplate();
    }

    function submitLoginForm() {
        const data = {
            login: document.getElementsByName('login')[0].value,
            password: document.getElementsByName('password')[0].value
        };

        sendLoginRequest(data);
    }

    async function sendLoginRequest(data) {
        let status = 200;
        await http.post({ url: '/login', data: data })
            .then((res) => { status = 200; console.log(res) })
            .catch((err) => { status = 400; });

        console.log(status)
        if (status === 200) {
            router.goProfile();
        }
    }

    window.router.register(goLogin);
    window.submitLoginForm = submitLoginForm;
})()