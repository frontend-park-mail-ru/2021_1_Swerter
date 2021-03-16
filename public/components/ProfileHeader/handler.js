(function() {
  class ProfileHeader {
    render(config) {
      return profileHeader(config);
    }
  }

  function edit() {
    console.log('edit');
    profileData.userData.modEdited = true;
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

    application.innerHTML = profileTemplate(profileData);
  }

  function uploadAva() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const avatarFile = input.files[0];
      const formData = new FormData();
      formData.append('avatar', avatarFile, avatarFile.name);
      console.log(avatarFile);

      window.profileData.userData.imgAvatar = URL.createObjectURL(avatarFile);
      window.http.post({url: '/profile/loadImg', data: formData, headers: {}});
      router.goProfile({needUpdate: false});
    };
    input.click();
  }

  function uploadBg() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      profileData.userData.imgBg = URL.createObjectURL(input.files[0]);
      router.goProfile();
    };
    input.click();
  }

  window.profileData = {
    postsData: [],
    userData: {
      myPage: true,
      imgBg: './assets/imgContent.jpg',
      imgAvatar: './assets/imgLogo.jpg',
      modEdited: false,
      login: 'login',
      password: 'password',
      firstName: 'Dima',
      lastName: 'Akzhigitov',
      needUpdate: false,
    },
  };

  window.profileHeader = {
    profileEdit: edit,
    profileEditSubmit: endEdit,
    uploadAva,
    uploadBg,
  };
})();
