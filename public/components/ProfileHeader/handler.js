(function () {
    class ProfileHeader {
        render(config) {
            return profileHeader(config);
        }
    }

    function edit() {
        console.log('edit')
        profileData.userData.modEdited = true
        router.goProfile()
    }

    async function endEdit() {
        console.log('end edit');
        profileData.userData.modEdited = false;
        profileData.userData.login = document.getElementById("input-login").value.replace(/<\/?[^>]+(>|$)/g, "");
        profileData.userData.password = document.getElementById("input-password").value.replace(/<\/?[^>]+(>|$)/g, "");
        profileData.userData.firstName = document.getElementById("input-firstname").value.replace(/<\/?[^>]+(>|$)/g, "");
        profileData.userData.lastName = document.getElementById("input-lastname").value.replace(/<\/?[^>]+(>|$)/g, "");

        let b = profileData.userData

        window.http.post({url:"/profile", data: JSON.stringify({
                login: b.login,
                password: b.password,
                firstName: b.firstName,
                lastName: b.lastName,
            })})
            .then((data)=> {
                console.log(data)
        });

        application.innerHTML = profileTemplate(profileData);
    }

    function uploadAva() {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            let avatarFile = input.files[0];
            let formData = new FormData();
            formData.append("avatar", avatarFile, avatarFile.name);
            console.log(avatarFile)

            window.http.post({url: "/profile/loadImg", data: formData, headers: {}})
            // profileUserAva = URL.createObjectURL(avatarFile);
            router.goProfile();
        }
        input.click();
    }

    function uploadBg() {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            profileData.userData.imgBg = URL.createObjectURL(input.files[0]);
            router.goProfile();
        }
        input.click();
    }
    window.profileUserAva = './assets/imgLogo.jpg';
    window.profileData = {
        postsData: [
            {
                imgAvatar: "./assets/imgUser.jpg",
                imgContent: "./assets/imgContent.jpg",
                postCreator: "Vasya pupkin",
                date: "12.12.2020",
                textPost: "Озеро Байкал расположено на границе Иркутской области и Республики Бурятия — в центре Азиатского континента. «Голубое око Сибири», «Священное море», «Бриллиант планеты» — так называют Байкал. Глубоководное озеро хранит крупнейший мировой запас пресной воды, уникальной по составу. Она не только чистая и прозрачная, но и содержит так мало минеральных солей, что приравнивается к дистиллированной.\n" +
                    "\n" +
                    "В форме рождающегося полумесяца Байкал вытянулся с юго-запада на северо-восток. Длина озера — 636 км, наибольшая ширина в центральной части — 81 км, минимальная ширина напротив дельты Селенги — 27 км. Расположен Байкал на высоте 455 м над уровнем моря, длина береговой линии — около 2 тыс. км. Более половины длины береговой линии озера находится под охраной.",
            },
            {
                imgAvatar: "./assets/imgUser.jpg",
                imgContent: "./assets/imgContent.jpg",
                postCreator: "Vasya pupkin",
                date: "12.12.2020",
            },
            {
                imgAvatar: "./assets/imgUser.jpg",
                postCreator: "Vasya pupkin",
                date: "12.12.2020",
                textPost: "Озеро Байкал расположено на границе Иркутской области и Республики Бурятия — в центре Азиатского континента. «Голубое око Сибири», «Священное море», «Бриллиант планеты» — так называют Байкал. Глубоководное озеро хранит крупнейший мировой запас пресной воды, уникальной по составу. Она не только чистая и прозрачная, но и содержит так мало минеральных солей, что приравнивается к дистиллированной.\n" +
                    "\n" +
                    "В форме рождающегося полумесяца Байкал вытянулся с юго-запада на северо-восток. Длина озера — 636 км, наибольшая ширина в центральной части — 81 км, минимальная ширина напротив дельты Селенги — 27 км. Расположен Байкал на высоте 455 м над уровнем моря, длина береговой линии — около 2 тыс. км. Более половины длины береговой линии озера находится под охраной.",
            }
        ],
        userData: {
            myPage: true,
            imgBg: "./assets/imgContent.jpg",
            imgAvatar: "./assets/imgLogo.jpg",
            modEdited: false,
            login: "login",
            password: "password",
            firstName: "Dima",
            lastName: "Akzhigitov",
        }
    }

    window.profileHeader = {
        profileEdit: edit,
        profileEditSubmit: endEdit,
        uploadAva,
        uploadBg
    }
})()