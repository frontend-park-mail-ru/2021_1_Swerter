(function () {
    function goProfile() {
        console.log('Profile')
        application.innerHTML = profileTemplate(profileData);
    }

    function goNews() {
        console.log('news')
        application.innerHTML = newsfeedTemplate(postsData);
    }

    window.router.register(goProfile)
    window.router.register(goNews)

})()