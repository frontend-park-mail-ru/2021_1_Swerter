import {Component} from "../../modules/Component.js";
import userStore from "../../Stores/UserStore.js";
import {UserStoreEvents} from "../../consts/events.js";

export class AddPost extends Component {
    constructor(props) {
        super(addpostTemplate, props);

        this.state = {
            user: {
                imgAvatar: null
            }
        };

        userStore.on(UserStoreEvents.STORE_CHANGED, () => this.userStoreChanged());
        this.registerElementEvent('click', this.onAddNewPostClick, this.getAddNewPostButtonElement);
        this.registerElementEvent('click', this.onAttachPhotoClick, this.getAttachPhotoToPostButtonElement);

        this.userStoreChanged();
    }

    onAttachPhotoClick() {
        this.props.onAttachPhotoClick();
    }

    onAddNewPostClick() {
        this.props.onAddNewPostClick();
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