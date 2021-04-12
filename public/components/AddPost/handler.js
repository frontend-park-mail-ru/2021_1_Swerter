import Dispatcher from '../../dispatcher.js';
import postStore from '../../Stores/PostStore.js';
import profilePage from "../../view/Profile/ProfilePage.js";

postStore.bind('post-added', () => {
    profilePage.emit('post-added')
});

postStore.bind('content-post-added', (fileName) => {
    addImgName(fileName);
});

function addCreatePostListeners() {
    // document.getElementById('add-post').addEventListener('click', addPostFlux);
    // document.getElementById('upload-post-content').addEventListener('click', uploadPostContentFlux);
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

export {addCreatePostListeners};

