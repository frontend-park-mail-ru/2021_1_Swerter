import {router} from '../../modules/router.js';
import {http} from '../../modules/http.js';
import Dispatcher from "../../dispatcher.js";
import userStore from "../../Stores/UserStore.js";
import profilePage from "../../view/Profile/ProfilePage.js";

function addProfileHeaderListener() {
    // document.getElementById('profile-header-upload-bg').addEventListener('click', uploadBg);
    document.getElementById('profile-header-upload-ava').addEventListener('click', uploadAvaFlux);
    if (profileData.userData.modEdited) {
        document.getElementById('profile-header-edit-submit').addEventListener('click', endEdit);
    } else {
        document.getElementById('btn-edit-Profile').addEventListener('click', edit);
    }

    userStore.bind('ava-uploaded',()=>{
        profilePage.emit('ava-uploaded')
    })
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

function uploadAvaFlux() {
    const inputAvaImg = document.createElement('input');
    inputAvaImg.type = 'file';
    inputAvaImg.onchange = (e) => {
        const imgAvaFile = inputAvaImg.files[0];
        Dispatcher.dispatch('upload-ava', {
            imgInfo: {
                imgAvaFile,
            },
        });
    };
    inputAvaImg.click();
}


// function uploadBg() {
//   const input = document.createElement('input');
//   input.type = 'file';
//   input.onchange = (e) => {
//     profileData.userData.imgBg = URL.createObjectURL(input.files[0]);
//     router.go('/profile', profileData)
//   };
//   input.click();
// }

// PIZDEZ
window.profileData = {
    postsData: [],
    userData: {
        login: 'login',
        password: 'password',
        firstName: 'Dima',
        lastName: 'Akzhigitov',
        imgBg: './assets/imgContent.jpg',
        imgAvatar: './assets/imgLogo.jpg',
        modEdited: false,
        myPage: true,
        needUpdate: false,
    },
};

export {addProfileHeaderListener};
