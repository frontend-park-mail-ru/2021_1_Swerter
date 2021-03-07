(function() {
    function edit () {
        console.log('edit')
        profileData.userData.modEdited = true
        application.innerHTML = profile(profileData);
    }

    function endEdit() {
        console.log('end edit');
        profileData.userData.modEdited = false;
        profileData.userData.firstName = document.getElementById("input-firstname").value;
        profileData.userData.lastName = document.getElementById("input-lastname").value;
        application.innerHTML = profile(profileData);
    }

    window.profileEditSubmit = endEdit;
    window.profileEdit = edit;
})()