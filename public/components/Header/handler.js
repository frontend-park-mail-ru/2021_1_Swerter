(function () {
    async function goProfile() {

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