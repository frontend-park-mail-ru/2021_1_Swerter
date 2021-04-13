import Dispatcher from '../../dispatcher.js';
import postStore from '../../Stores/PostStore.js';
import profilePage from "../../view/Profile/ProfilePage.js";

postStore.bind('post-added', () => {
    profilePage.emit('post-added')
});

postStore.bind('content-changed', () => {
    profilePage.emit('content-post-changed')
})

postStore.bind('deleted-img-from-new-post', () => {
    profilePage.emit('content-post-changed')
})

export function addPostModalAddListeners() {

    document.getElementById('new-post__add-btn').addEventListener('click', addPostFlux);

    document.getElementById('new-post-text').addEventListener('input', () => {
        const text = document.getElementById('new-post-text').value
        profilePage.emit('text-post-changed', text)
    });
    document.getElementById('modal-bg-close').addEventListener('click', closeModal);
    document.getElementById('close-post-modal-btn').addEventListener('click', closeModal);
    document.getElementById('attach__photo').addEventListener('click', uploadPostContentFlux);
    document.getElementById('del-all-images-btn').addEventListener('click', ()=>{
        Dispatcher.dispatch('clear-all-content');
    });
    document.getElementById('edit-all-images-btn').addEventListener('click', ()=>{
        profilePage.emit('edit-all-images-btn');
    });

}

export function addPostModalEditListeners() {
    document.getElementById('btn-edit-post-end').addEventListener('click', ()=>{
        profilePage.emit('post-edited-ended');
    });
    document.getElementById('modal-bg-close').addEventListener('click', closeModal);
    document.getElementById('close-post-modal-btn').addEventListener('click', closeModal);
    // document.getElementById('upload-post-content').addEventListener('click', uploadPostContentFlux);
    const delImgIds = document.querySelectorAll('[id^="btn-del-img-"]')
    delImgIds.forEach((item)=> {
        item.addEventListener('click', () => {
            const chanks = item.id.split('-')
            let imgId = chanks[chanks.length - 1]
            Dispatcher.dispatch('del-img-from-post', {
                imgId
            })
        });
    });
}

function closeModal() {
    profilePage.emit("modal-closed")
}

function addPostFlux() {
    const textPost = document.getElementById('new-post-text').value.replace(/<\/?[^>]+(>|$)/g, '');
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
