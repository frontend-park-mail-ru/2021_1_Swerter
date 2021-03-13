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

            window.profileData.userData.imgAvatar = URL.createObjectURL(avatarFile);
            window.http.post({url: "/profile/loadImg", data: formData, headers: {}});
            router.goProfile(true);
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

    window.profileData = {
        postsData: [],
        userData: {
            myPage: true,
            imgBg: "./assets/imgContent.jpg",
            imgAvatar: "./assets/imgLogo.jpg",
            modEdited: false,
            login: "login",
            password: "password",
            firstName: "Dima",
            lastName: "Akzhigitov",
            needUpdate: false,
        }
    }

    window.profileHeader = {
        profileEdit: edit,
        profileEditSubmit: endEdit,
        uploadAva,
        uploadBg
    }
})()