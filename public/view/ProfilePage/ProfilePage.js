import {Component} from "../../modules/Component.js";
import {ProfileHeader} from "../../components/ProfileHeader/ProfileHeader.js";
import {Post} from "../../components/Post/Post.js";
import {AlbumPreview} from "../../components/AlbumPreview/AlbumPreview.js";
import {Header} from "../../components/Header/Header.js";
import {AddPost} from "../../components/AddPost/AddPost.js";
import {PostModal} from "../../components/PostModal/PostModal.js";

import userStore from "../../Stores/UserStore.js";
import postStore from "../../Stores/PostStore.js";
import {PostStoreEvents} from "../../consts/events.js";
import {AddAlbum} from "../../components/AddAlbum/AddAlbum.js";

class ProfilePage extends Component {
    constructor(props) {
        super(profilepageTemplate, props);

        this.state = {
            myPage: true,
            postModalOpened: false,
            albumEditMode: false,
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

        const addPostProps = {
            onAttachPhotoClick: () => {
                this.updateState({postModalOpened: true});
            },

            onAddNewPostClick: () => {
                this.updateState({postModalOpened: true});
            }
        };

        this.registerChildComponent('AddPost', AddPost, addPostProps);
        this.registerChildComponent('Post', Post);
        this.registerChildComponent('AlbumPreview', AlbumPreview);

        const postModalProps = {
            onModalClose: () => {
                this.updateState({postModalOpened: false});
            }
        };

        this.registerChildComponent('PostModal', PostModal, postModalProps);

        const addAlbumProps = {
            onClose: () => {
                this.updateState({albumEditMode: false});
            }
        };

        this.registerChildComponent('AddAlbum', AddAlbum, addAlbumProps);
        this.registerElementEvent('click', this.onCreateAlbumClick, this.getCreateNewAlbumBlockElement);

        postStore.on(PostStoreEvents.POSTS_REQUEST_SUCCESS, () => this.onPostsRequestSuccess());
        this.onPostsRequestSuccess();
    }

    onPostsRequestSuccess() {
        const postsData = postStore.getState();
        this.updateState({postsData});
    }

    onCreateAlbumClick() {
        this.updateState({albumEditMode: true});
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
