(function() {
  function closeModal() {
    profileData.userData.editCreds = false;
    profileData.userData.changeLogin = false;
    profileData.userData.changePassword = false;

    router.goProfile();
  }

  async function submitChangeLogin() {
    const login = document.getElementById('input-new-login').value.replace(/<\/?[^>]+(>|$)/g, '');
    result = await window.http.post({
      url: '/profile',
      data: JSON.stringify({login}),
    });
    if (result.status === 200) {
      profileData.userData.changeLogin = false;
      router.goProfile({needUpdate: false});
    }
  }

  async function submitChangePassword() {
    // const oldPassword = document.getElementById('input-new-login').value.replace(/<\/?[^>]+(>|$)/g, '');
    const newPassword = document.getElementById('input-new-password').value.replace(/<\/?[^>]+(>|$)/g, '');
    // const repNewPassword = document.getElementById('input-new-login').value.replace(/<\/?[^>]+(>|$)/g, '');
    result = await window.http.post({
      url: '/profile',
      data: JSON.stringify({
        'password': newPassword,
      }),
    });
    if (result.status === 200) {
      profileData.userData.changePassword = false;
      router.goProfile({needUpdate: false});
    }
  }

  window.submitChangePassword = submitChangePassword;
  window.submitChangeLogin = submitChangeLogin;
  window.closeModal = closeModal;
})();
