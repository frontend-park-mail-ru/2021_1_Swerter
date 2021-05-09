import {Component} from "../../modules/Component";
import {AlbumPhoto} from "../../components/AlbumPhoto/AlbumPhoto";
import albumStore from "../../Stores/AlbumStore";
import {Header} from "../../components/Header/Header";
import {AlbumStoreEvents} from "../../consts/events";
import * as albumPageTemplate from './AlbumPage.tmpl';
import './AlbumPage.css';

class AlbumPage extends Component {
    constructor() {
        super(albumPageTemplate);

        this.state = {
            imgUrls: []
        };
        this.registerChildComponent('Header', Header);
        this.registerChildComponent('AlbumPhoto', AlbumPhoto);

        albumStore.on(AlbumStoreEvents.ALBUM_REQUEST_SUCCESS, () => this.onAlbumRequestSuccess());
        this.onAlbumRequestSuccess();
    }

    onAlbumRequestSuccess() {
        this.updateState({imgUrls: albumStore.getState().currentAlbum.imgContent});
    }
}

const albumPage = new AlbumPage();

export default albumPage;
