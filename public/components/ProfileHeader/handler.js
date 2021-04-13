import Dispatcher from "../../dispatcher.js";
import userStore from "../../Stores/UserStore.js";
import profilePage from "../../view/Profile/ProfilePage.js";

userStore.bind('ava-uploaded',()=>{
    profilePage.emit('ava-uploaded')
})

userStore.bind('new-name-setted',()=>{
    profilePage.emit('new-name-setted')
})

function addProfileHeaderListener() {
    // document.getElementById('profile-header-upload-bg').addEventListener('click', uploadBg);
    document.getElementById('profile-header-upload-ava').addEventListener('click', uploadAvaFlux);
    if (profilePage.state.viewState.modEdited) {
        document.getElementById('profile-header-edit-submit').addEventListener('click', ()=>{
            endEdit();
            profilePage.emit('end-edit-name')
        });
    } else {
        document.getElementById('btn-edit-Profile').addEventListener('click', ()=>{
            profilePage.emit('edit-name')
        });
    }
    document.getElementById('posts-switch').addEventListener('click', () => {
        profilePage.emit('posts-switch');
    });
    document.getElementById('albums-switch').addEventListener('click', () => {
        profilePage.emit('albums-switch');
    });
}


function endEdit() {
    const firstName = document.getElementById('input-firstname').value.replace(/<\/?[^>]+(>|$)/g, '');
    const lastName = document.getElementById('input-lastname').value.replace(/<\/?[^>]+(>|$)/g, '');

    Dispatcher.dispatch('new-name',{
        firstName,
        lastName
    })
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
