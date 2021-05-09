import {Component} from "../../modules/Component.js";
import {ProfileHeader} from "../../components/ProfileHeader/ProfileHeader.js";
import {Post} from "../../components/Post/Post.js";
import {AlbumPreview} from "../../components/AlbumPreview/AlbumPreview.js";
import {Header} from "../../components/Header/Header.js";
import {AddPost} from "../../components/AddPost/AddPost.js";

import userStore from "../../Stores/UserStore.js";
import postStore from "../../Stores/PostStore.js";
import albumStore from "../../Stores/AlbumStore.js";

import {AlbumStoreEvents, PostStoreEvents} from "../../consts/events.js";
import {AddAlbum} from "../../components/AddAlbum/AddAlbum.js";
import {UserActions} from "../../actions/UserActions.js";

class ProfilePage extends Component {
    constructor(props) {
        super(profilepageTemplate, props);

        this.state = {
            myPage: true,
            postModalOpened: false,
            switchContent: 'POSTS',
            postsData: [],
            albumsData: []
        }

        this.registerChildComponent('Header', Header);

        const profileHeaderProps = {
            onPostsSwitchButtonClick: () => {
                this.updateState({switchContent: 'POSTS'});
            },

            onAlbumsSwitchButtonClick: () => {
                this.updateState({switchContent: 'ALBUMS'});
            }
        };

        this.registerChildComponent('ProfileHeader', ProfileHeader, profileHeaderProps);

        this.registerChildComponent('AddPost', AddPost);
        this.registerChildComponent('Post', Post);
        this.registerChildComponent('AlbumPreview', AlbumPreview);

        const addAlbumProps = {
            onClose: () => {
                this.updateState({albumEditMode: false});
            }
        };

        this.registerChildComponent('AddAlbum', AddAlbum, addAlbumProps);
        this.registerElementEvent('click', this.onCreateAlbumClick, this.getCreateNewAlbumBlockElement);

        postStore.on(PostStoreEvents.POSTS_REQUEST_SUCCESS, () => this.onPostsRequestSuccess());
        postStore.on(PostStoreEvents.POST_ADD_SUCCESS, () => this.onPostsRequestSuccess());
        albumStore.on(AlbumStoreEvents.USER_ALBUMS_REQUEST_SUCCESS, () => this.onAlbumsRequestSuccess());

        this.onPostsRequestSuccess();
        this.onAlbumsRequestSuccess();
    }

    onPostsRequestSuccess() {
        const postsData = postStore.getState();
        this.updateState({postsData});
    }

    onAlbumsRequestSuccess() {
        const albumsData = albumStore.getState().albums;
        this.updateState({albumsData});
    }

    onCreateAlbumClick() {
        this.dispatchUserAction(UserActions.GO_NEW_ALBUM);
    }

    getCreateNewAlbumBlockElement() {
        return this.element.getElementsByClassName('create-album-block')[0];
    }

    allowed() {
        return userStore.isUserAuthorized();
    }
}

const profilePage = new ProfilePage();

export default profilePage;
