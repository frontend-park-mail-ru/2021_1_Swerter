(function(){
    function goRegister() {
        console.log('Register')
        application.innerHTML = registerpageTemplate();
    }

    function submitRegisterForm() {
        const data = {
            login: document.getElementsByName('login')[0].value.replace(/<\/?[^>]+(>|$)/g, ""),
            password: document.getElementsByName('password')[0].value.replace(/<\/?[^>]+(>|$)/g, ""),
            firstName: document.getElementsByName('first-name')[0].value.replace(/<\/?[^>]+(>|$)/g, ""),
            lastName: document.getElementsByName('last-name')[0].value.replace(/<\/?[^>]+(>|$)/g, "")
        };

        sendRegisterRequest(data);
    }

    async function sendRegisterRequest(data) {
        res = await http.post({ url: '/register', data: data })

        if (res.status === 200) {
            router.goLogin();
        }
    }

    window.submitRegisterForm = submitRegisterForm;
    window.router.register(goRegister);
})()