import {router} from '../../modules/router.js';
import {http} from '../../modules/http.js';

function addProfileHeaderListener() {
  // document.getElementById('profile-header-upload-bg').addEventListener('click', uploadBg);
  document.getElementById('profile-header-upload-ava').addEventListener('click', uploadAva);
  if (profileData.userData.modEdited) {
    document.getElementById('profile-header-edit-submit').addEventListener('click', endEdit);
  } else {
    document.getElementById('btn-edit-Profile').addEventListener('click', edit);
  }
}

class ProfileHeader {
  render(config) {
    return profileHeader(config);
  }
}

function edit() {
  profileData.userData.modEdited = true;
  router.go('/profile', profileData)

}


async function endEdit() {
  profileData.userData.modEdited = false;
  profileData.userData.firstName = document.getElementById('input-firstname').value.replace(/<\/?[^>]+(>|$)/g, '');
  profileData.userData.lastName = document.getElementById('input-lastname').value.replace(/<\/?[^>]+(>|$)/g, '');
  const body = profileData.userData;

  http.post({
    url: '/profile', data: JSON.stringify({
      firstName: body.firstName,
      lastName: body.lastName,
    }),
  });
  router.go('/profile', profileData)
}

function uploadAva() {
  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = (e) => {
    const avatarFile = input.files[0];
    const formData = new FormData();
    formData.append('avatar', avatarFile, avatarFile.name);

    window.profileData.userData.imgAvatar = URL.createObjectURL(avatarFile);
    http.post({url: '/profile/loadImg', data: formData, headers: {}});
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

// PIZDEZ
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

export {addProfileHeaderListener};
