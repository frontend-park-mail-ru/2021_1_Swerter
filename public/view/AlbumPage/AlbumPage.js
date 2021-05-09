import {Component} from "../../modules/Component.js";
import {AlbumPhoto} from "../../components/AlbumPhoto/AlbumPhoto.js";
import albumStore from "../../Stores/AlbumStore.js";
import {Header} from "../../components/Header/Header.js";
import {AlbumStoreEvents} from "../../consts/events.js";

class AlbumPage extends Component {
    constructor() {
        super(albumpageTemplate);

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
