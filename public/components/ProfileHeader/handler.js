import {router} from '../../modules/router.js';
import {http} from '../../modules/http.js';

function addProfileHeaderListener() {
  document.getElementById('profile-header-upload-bg').addEventListener('click', uploadBg);
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
  console.log('edit');
  profileData.userData.modEdited = true;
  router.goProfile();
}

async function endEdit() {
  console.log('end edit');
  profileData.userData.modEdited = false;
  profileData.userData.login = document.getElementById('input-login').value.replace(/<\/?[^>]+(>|$)/g, '');
  profileData.userData.password = document.getElementById('input-password').value.replace(/<\/?[^>]+(>|$)/g, '');
  profileData.userData.firstName = document.getElementById('input-firstname').value.replace(/<\/?[^>]+(>|$)/g, '');
  profileData.userData.lastName = document.getElementById('input-lastname').value.replace(/<\/?[^>]+(>|$)/g, '');

  const b = profileData.userData;

  http.post({
    url: '/profile', data: JSON.stringify({
      login: b.login,
      password: b.password,
      firstName: b.firstName,
      lastName: b.lastName,
    }),
  }).then((data) => {
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
