(function () {
    async function goProfile(arg = {needUpdate: true}) {
        if(!arg.needUpdate){
            profileData.postsData = addMetaPosts(profileData.postsData);
            application.innerHTML = profileTemplate(profileData);
            return
        }
        const user = await http.get({url: '/profile'});
        console.log(user)
        if (user.status === 200) {
            profileData.userData.login = user.body['login'];
            profileData.userData.firstName = user.body['firstName'];
            profileData.userData.lastName = user.body['lastName'];

            profileData.userData.imgAvatar = http.getHost() + '/static/usersAvatar/';
            profileData.userData.imgAvatar += user.body['avatar'] ? user.body['avatar'] : 'defaultUser.jpg';
            window.userAvatar = profileData.userData.imgAvatar

            profileData.postsData = addMetaPosts(postsObjToList(user.body['postsData']));
            console.log(profileData.postsData);
            profileData.userData.myPage = true;
        } else {
            console.log(user.status)
            router.goLogin();
            return;
        }
        console.log(profileData.postsData)
        application.innerHTML = profileTemplate(profileData);
    }

    async function goFriends() {
        const user = await http.get({url: '/profile/id2'});
        profileUserAva = profileData.userData.imgAvatar;
        if (user.status === 200) {
            profileData.userData.firstName = user.body['firstName'];
            profileData.userData.lastName = user.body['lastName'];
            profileData.postsData = addMetaPosts(postsObjToList(user.body['postsData']));
            profileData.userData.imgAvatar = '../../assets/imgUser.jpg'
            profileData.userData.myPage = false;
        }

        application.innerHTML = profileTemplate(profileData);
    }

    async function goNews() {
        const data = await http.get({url: '/posts'});
        console.log(data)
        postsData = postsObjToList(data.body).map((item) => {
            let urlImg = http.getHost() + '/static/usersAvatar/';
            urlImg += item.imgAvatar ? item.imgAvatar : 'defaultUser.jpg';
            item.imgAvatar = urlImg;
            return item;
        })

        application.innerHTML = newsfeedTemplate(postsData);
    }


    function postsObjToList(posts) {
        let listPosts = [];
        for (key in posts) {
            posts[key].imgContent = posts[key].imgContent ? 'http://localhost:8000' + posts[key].imgContent : '';
            listPosts.push(posts[key]);
        }
        return listPosts.reverse();
    }

    function addMetaPosts(posts) {
        return posts.map((item) => {
            item.imgAvatar = profileData.userData.imgAvatar;
            item.postCreator = profileData.userData.firstName + " " + profileData.userData.lastName;
            return item;
        })
    }

    function logout() {
        sendLogoutRequest();
    }

    async function sendLogoutRequest() {
        res = await http.post({url: '/logout'})

        if (res.status === 200) {
            router.goLogin();
        }
    }

    window.router.register(goProfile);
    window.router.register(goNews);
    window.router.register(goFriends);

    window.logout = logout;
})()