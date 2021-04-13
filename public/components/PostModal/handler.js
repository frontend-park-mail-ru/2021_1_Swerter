import Dispatcher from '../../dispatcher.js';
import postStore from '../../Stores/PostStore.js';
import profilePage from "../../view/Profile/ProfilePage.js";

postStore.bind('post-added', () => {
    profilePage.emit('post-added')
});

postStore.bind('content-changed', () => {
    profilePage.emit('content-post-changed')
})

export function addPostModalListeners() {
    document.getElementById('new-post__add-btn').addEventListener('click', () => {
        console.log('post add');
    });
    document.getElementById('modal-bg-close').addEventListener('click', closeModal);
    document.getElementById('close-post-modal-btn').addEventListener('click', closeModal);
    document.getElementById('attach__photo').addEventListener('click', uploadPostContentFlux);
    document.getElementById('del-all-images-btn').addEventListener('click', ()=>{
        Dispatcher.dispatch('clear-all-content')
    });
    // document.getElementById('upload-post-content').addEventListener('click', uploadPostContentFlux);
}

function closeModal() {
    profilePage.emit("modal-closed")
}

function addPostFlux() {
    const textPost = document.getElementById('text-post').value.replace(/<\/?[^>]+(>|$)/g, '');
    const currentDate = new Date();
    const date = currentDate.getDay() + '.' + currentDate.getMonth() + '.' + currentDate.getFullYear();
    const u = profileData.userData;
    const imgAvatar = u.imgAvatar;
    const postCreator = u.firstName + ' ' + u.lastName;

    Dispatcher.dispatch('add-post', {
        newPostInfo: {
            textPost,
            date,
            imgAvatar,
            postCreator,
        },
    });
}

function uploadPostContentFlux() {
    const inputPostImg = document.createElement('input');
    inputPostImg.type = 'file';
    inputPostImg.onchange = (e) => {
        const imgContentFile = inputPostImg.files[0];
        Dispatcher.dispatch('add-content-post', {
            imgInfo: {
                imgContentFile,
            },
        });
    };
    inputPostImg.click();
}

function addImgName(fileName) {
    const imgPostName = document.getElementById('uploaded-post-img');
    imgPostName.innerText = fileName.slice(0, 15) + '...';
}
