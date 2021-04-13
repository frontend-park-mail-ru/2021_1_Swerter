import Dispatcher from '../../dispatcher.js';
import albumStore from '../../Stores/AlbumStore.js';
import newAlbumPage from '../../view/NewAlbumPage/NewAlbumPage.js';

albumStore.bind('album-content-loaded', () => {
  newAlbumPage.emit("album-content-loaded");
})

export function addAlbumListeners() {
  document.getElementById('add-photo-to-album').addEventListener('click', addPhotoToAlbum);
}

function addPhotoToAlbum() {
  const inputAlbumImg = document.createElement('input');
  inputAlbumImg.type = 'file';
  inputAlbumImg.onchange = (e) => {
    const imgContentFile = inputAlbumImg.files[0];
    Dispatcher.dispatch('add-photo-to-album', {
      imgInfo: {
        imgContentFile,
      },
    });
  };
  inputAlbumImg.click();
}



