(function() {
  function closeModal() {
    profileData.userData.editCreds = false;
    profileData.userData.changeLogin = false;
    profileData.userData.changePassword = false;

    router.goProfile();
  }

  async function endEdit() {
    console.log('end edit');
    profileData.userData.modEdited = false;
    profileData.userData.firstName = document.getElementById('input-firstname').value.replace(/<\/?[^>]+(>|$)/g, '');
    profileData.userData.lastName = document.getElementById('input-lastname').value.replace(/<\/?[^>]+(>|$)/g, '');

    const b = profileData.userData;

    window.http.post({
      url: '/profile', data: JSON.stringify({
        firstName: b.firstName,
        lastName: b.lastName,
      }),
    })
        .then((data) => {
          console.log(data);
        });

    router.goProfile({needUpdate: false});
  }

  window.closeModal = closeModal;
})();
