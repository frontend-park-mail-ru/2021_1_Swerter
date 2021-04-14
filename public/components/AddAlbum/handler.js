import Dispatcher from '../../dispatcher.js';
import albumStore from '../../Stores/AlbumStore.js';
import newAlbumPage from '../../view/NewAlbumPage/NewAlbumPage.js';

albumStore.bind('album-content-loaded', () => {
  newAlbumPage.emit("album-content-loaded");
})

export function addAlbumListeners() {
  document.getElementById('create-new-album').addEventListener('click', addAlbum);
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


function addAlbum() {
  const albumTitle = document.getElementById('album-title').value.replace(/<\/?[^>]+(>|$)/g, '');
  const albumDescription = document.getElementById('album-description').value.replace(/<\/?[^>]+(>|$)/g, '');
  Dispatcher.dispatch('add-album', {
    newAlbumInfo: {
      albumTitle,
      albumDescription
    },
  });
}



