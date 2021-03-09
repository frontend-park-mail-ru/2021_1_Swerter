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
        application.innerHTML = profileTemplate(profileData);
    }

    function endEdit() {
        console.log('end edit');
        profileData.userData.modEdited = false;
        profileData.userData.firstName = document.getElementById("input-firstname").value;
        profileData.userData.lastName = document.getElementById("input-lastname").value;
        application.innerHTML = profileTemplate(profileData);
    }

    function uploadImg(id) {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            document.getElementById(id).src = URL.createObjectURL(input.files[0]);
        }
        input.click();
    }

    window.profileHeader = {
        profileEdit: edit,
        profileEditSubmit: endEdit,
        uploadImg,
    }
})()