import {Component} from "../../modules/Component";
import * as addAlbumTemplate from './AddAlbum.tmpl';
import './AddAlbum.css';

export class AddAlbum extends Component {
    constructor(props) {
        super(addAlbumTemplate, props);

        this.state = {
            title: this.props.title,
            description: this.props.description
        }

        this.registerElementEvent('click', this.onAddPhotoClick, this.getAddPhotoToAlbumButtonElement);
        this.registerElementEvent('click', this.onCreateAlbumClick, this.getCreateNewAlbumButtonElement);
        this.registerElementEvent('change', this.onChange);
    }

    onChange() {
        const title = this.getAlbumTitleInputElement().value.replace(/<\/?[^>]+(>|$)/g, '');
        const description = this.getAlbumDescriptionElement().value.replace(/<\/?[^>]+(>|$)/g, '');

        this.props.onTitleChange(title);
        this.props.onDescriptionChange(description);
    }

    onCreateAlbumClick() {
        this.props.onCreateAlbumClick();
    }

    onAddPhotoClick() {
        this.props.onAddPhotoClick();
    }

    getCreateNewAlbumButtonElement() {
        return this.element.getElementsByClassName('create-new-album')[0];
    }

    getAddPhotoToAlbumButtonElement() {
        return this.element.getElementsByClassName('add-photo-to-album')[0];
    }

    getAlbumTitleInputElement() {
        return this.element.getElementsByClassName('album-title')[0];
    }

    getAlbumDescriptionElement() {
        return this.element.getElementsByClassName('album-description')[0];
    }
}