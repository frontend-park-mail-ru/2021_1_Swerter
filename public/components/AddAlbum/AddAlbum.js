import {Component} from "../../modules/Component.js";
import {UserActions} from "../../actions/UserActions.js";

export class AddAlbum extends Component {
    constructor(props) {
        super(addalbumTemplate, props);

        this.state = {
            albumTitle: '',
            albumDescription: '',
            files: [],
            contentUrls: []
        }

        this.registerElementEvent('click', this.onAddPhotoClick, this.getAddPhotoToAlbumButtonElement);
        this.registerElementEvent('click', this.onCreateAlbumClick, this.getCreateNewAlbumButtonElement);
    }

    onCreateAlbumClick() {
        const albumTitle = document.getElementById('album-title').value.replace(/<\/?[^>]+(>|$)/g, '');
        const albumDescription = document.getElementById('album-description').value.replace(/<\/?[^>]+(>|$)/g, '');
        this.dispatchUserAction(UserActions.NEW_ALBUM, {
            albumTitle,
            albumDescription,
            attachments: this.state.files
        });
    }

    onAddPhotoClick() {
        const inputAlbumImg = document.createElement('input');
        inputAlbumImg.type = 'file';
        inputAlbumImg.onchange = (e) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const img = event.target.result;
                this.updateState({contentUrls: this.state.contentUrls.concat(img)});
            };

            const imgContentFile = inputAlbumImg.files[0];
            this.updateState({files: this.state.files.concat(imgContentFile)});
            reader.readAsDataURL(imgContentFile);
        };
    }

    getCreateNewAlbumButtonElement() {
        return this.element.getElementsByClassName('create-new-album')[0];
    }

    getAddPhotoToAlbumButtonElement() {
        return this.element.getElementsByClassName('add-photo-to-album')[0];
    }

}