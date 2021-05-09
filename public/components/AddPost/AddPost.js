import {Component} from "../../modules/Component";
import {PostModal} from "../PostModal/PostModal";
import * as addPostTemplate from './AddPost.tmpl';
import './AddPost.css';

import {UserStoreEvents} from "../../consts/events";
import userStore from "../../Stores/UserStore";

export class AddPost extends Component {
    constructor(props) {
        super(addPostTemplate, props);

        this.state = {
            user: {
                imgAvatar: null
            },
            postModalOpened: false
        };

        const postModalProps = {
            _onModalClose: () => this.updateState({postModalOpened: false}),
            hideThis(element) {
                this._onModalClose();
                element.hide();
            }
        };
        this.registerChildComponent('PostModal', PostModal, postModalProps);

        userStore.on(UserStoreEvents.STORE_CHANGED, () => this.userStoreChanged());
        this.registerElementEvent('click', this.onAddNewPostClick, this.getAddNewPostButtonElement);
        this.registerElementEvent('click', this.onAttachPhotoClick, this.getAttachPhotoToPostButtonElement);

        this.userStoreChanged();
    }


    onAttachPhotoClick() {
        this.updateState({postModalOpened: true});
    }

    onAddNewPostClick() {
        this.updateState({postModalOpened: true});
    }

    getAddNewPostButtonElement() {
        return this.element.getElementsByClassName('new-post-btn')[0];
    }

    getAttachPhotoToPostButtonElement() {
        return this.element.getElementsByClassName('attach-post-photo-btn')[0];
    }

    userStoreChanged() {
        const {imgAvatar} = userStore.getState();
        this.updateState({user: {imgAvatar}});
    }
}