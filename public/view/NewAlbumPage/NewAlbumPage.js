import {Component} from "../../modules/Component";
import {AddAlbum} from '../../components/AddAlbum/AddAlbum';
import {AlbumPhoto} from "../../components/AlbumPhoto/AlbumPhoto";
import {Header} from "../../components/Header/Header";
import {getFileFromUser} from "../../modules/utils";
import {UserActions} from "../../actions/UserActions";
import * as newAlbumPageTemplate from './NewAlbumPage.tmpl';
import './NewAlbumPage.sass';

class NewAlbumPage extends Component {
    constructor() {
        super(newAlbumPageTemplate);

        this.state = {
            title: '',
            description: '',
            files: [],
            contentUrls: []
        };

        this.registerChildComponent('Header', Header);

        const addAlbumProps = {
            onAddPhotoClick: () => {
                getFileFromUser().then(({file, url}) => this.appendImg(file, url))
            },
            onTitleChange: title => this.setState({title}),
            onDescriptionChange: description => this.setState({description}),
            onCreateAlbumClick: () => this.onCreateAlbumClick()
        };
        this.registerChildComponent('AddAlbum', AddAlbum, addAlbumProps);
        this.registerChildComponent('AlbumPhoto', AlbumPhoto);
    }

    onCreateAlbumClick() {
        this.dispatchUserAction(UserActions.NEW_ALBUM, {
            albumTitle: this.state.title,
            albumDescription: this.state.description,
            attachments: this.state.files
        });
    }

    appendImg(img, url) {
        this.state.files.push(img);
        this.state.contentUrls.push(url);
        this.updateState();
    }

    // allowed() {
    //     return userStore.isUserAuthorized();
    // }
}

const newAlbumPage = new NewAlbumPage();

export default newAlbumPage;
