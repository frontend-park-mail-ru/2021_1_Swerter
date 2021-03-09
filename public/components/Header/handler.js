(function () {
    async function goProfile() {
        let user = window.profileData.userData;
        let profile = await http.get({url:'/profile'});
        let userInfo = profile.body
        user.firstName = userInfo.FirstName;
        user.lastName = userInfo.LastName;
        application.innerHTML = profileTemplate(profileData);
    }

    function goNews() {
        application.innerHTML = newsfeedTemplate(postsData);
    }

    function logout() {
        sendLogoutRequest();
    }

    async function sendLogoutRequest() {
        res = await http.post({ url: '/logout' })

        if (res.status === 200) {
            router.goLogin();
        }
    }

    window.router.register(goProfile)
    window.router.register(goNews)

    window.logout = logout;
})()