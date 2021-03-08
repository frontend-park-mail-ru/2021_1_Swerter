(function () {
    function goProfile() {
        console.log('profile')
        application.innerHTML = profile(profileData);
    }

    function goNews() {
        console.log('news')
        application.innerHTML = newsFeed(postsData);
    }

    window.router = {
        goProfile,
        goNews
    }

})()