(function () {
    class ProfileHeader {
        counter = 0;

        render(config) {
            counter++;
            config.id = counter;
            return profileHeader(config);
        }
    }

    config = {
        edit,
        endEdit,
    }

    function edit() {
        console.log('edit')
        profileData.userData.modEdited = true
        router.goProfile()
    }

    function endEdit() {
        console.log('end edit');
        profileData.userData.modEdited = false;
        profileData.userData.login = document.getElementById("input-login").value;
        profileData.userData.password = document.getElementById("input-password").value;
        profileData.userData.firstName = document.getElementById("input-firstname").value;
        profileData.userData.lastName = document.getElementById("input-lastname").value;
        router.goProfile()
    }

    function uploadAva() {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            profileData.userData.imgAvatar = URL.createObjectURL(input.files[0]);
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

    window.profileHeader = {
        profileEdit: edit,
        profileEditSubmit: endEdit,
        uploadAva,
        uploadBg
    }
})()