(function () {
    async function goProfile() {
        const user = await http.get({url: '/profile'});

        if (user.status === 200) {
            profileData.userData.login = user.body['login'];
            profileData.userData.firstName = user.body['firstName'];
            profileData.userData.lastName = user.body['lastName'];
<<<<<<< HEAD
=======
            profileData.userData.myPage = false;
        }

        application.innerHTML = profileTemplate(profileData);
    }

    async function goFriends() {
        const user = await http.get({url: '/profile/id2'});

        if (user.status === 200) {
            profileData.userData.firstName = user.body['firstName'];
            profileData.userData.lastName = user.body['lastName'];
            profileData.userData.myPage = false;
>>>>>>> dev
        }

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

    window.router.register(goProfile);
    window.router.register(goNews);
    window.router.register(goFriends);

    window.logout = logout;
})()