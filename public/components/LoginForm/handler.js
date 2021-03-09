(function () {
    function goLogin() {
        console.log('Login')
        application.innerHTML = loginpageTemplate();
    }

    function submitLoginForm() {
        const data = {
            login: document.getElementsByName('login')[0].value.replace(/<\/?[^>]+(>|$)/g, ""),
            password: document.getElementsByName('password')[0].value.replace(/<\/?[^>]+(>|$)/g, "")
        };

        sendLoginRequest(data);
    }

    async function sendLoginRequest(data) {
        res = await http.post({ url: '/login', data: data })

        if (res.status === 200) {
            router.goProfile();
        }
    }

    window.router.register(goLogin);
    window.submitLoginForm = submitLoginForm;
})()