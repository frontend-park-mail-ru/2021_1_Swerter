import profilePage from "../../view/Profile/ProfilePage.js";

function addCreatePostListeners() {
    document.getElementById('new-post-btn').addEventListener('click', () => {
        profilePage.emit('post-adding')
    });
    document.getElementById('attach-post-photo-btn').addEventListener('click', () => {
        profilePage.emit('post-adding')
    });
    // document.getElementById('upload-post-content').addEventListener('click', uploadPostContentFlux);
}

export {addCreatePostListeners};

