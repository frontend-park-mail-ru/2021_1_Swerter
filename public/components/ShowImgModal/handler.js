import profilePage from "../../view/Profile/ProfilePage.js";

export function addShowModalAddListeners() {

    document.getElementById('btn-close__modal__show-post').addEventListener('click', ()=>{
        profilePage.emit("modal-closed")
    });

    document.getElementById('modal-bg-close').addEventListener('click', ()=>{
        profilePage.emit("modal-closed")
    });

    document.getElementById('modal-bg-close').addEventListener('click', ()=>{
        profilePage.emit("modal-closed")
    });

    document.getElementById('go-next-img').addEventListener('click', ()=>{
        profilePage.emit("go-next-img")
    });

    document.getElementById('go-prev-img').addEventListener('click', ()=>{
        profilePage.emit("go-prev-img")
    });

    // document.getElementById('edit-all-images-btn').addEventListener('click', ()=>{
        // profilePage.emit('edit-all-images-btn');
    // });
}
