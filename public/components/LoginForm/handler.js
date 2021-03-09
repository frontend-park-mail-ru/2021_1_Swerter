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
            let user = window.profileData.userData;
            let profile = await http.get({url:'/profile'});
            let userInfo = profile.body
            console.log("------");
            console.log(userInfo);
            console.log("------");
            user.firstName = userInfo.FirstName;
            user.lastName = userInfo.LastName;
            router.goProfile();
        }
    }

    window.router.register(goLogin);
    window.submitLoginForm = submitLoginForm;
})()