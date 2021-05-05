import {Component} from "../../modules/Component.js";
import {ButtonClose} from "./ButtonClose/ButtonClose.js";

import userStore from "../../Stores/UserStore.js";
import {UserActions} from "../../actions/UserActions.js";
import postStore from "../../Stores/PostStore.js";
import {PostStoreEvents} from "../../consts/events.js";

export class PostModal extends Component {
    constructor(props) {
        super(postmodalTemplate, props);

        this.state = {
            postEditing: false,
            postText: '',
            contentUrls: [],
            files: []
        }


        const buttonCloseProps = {
            onClick: (id) => {
                this.deleteAttachmentById(id);
            }
        };

        this.registerChildComponent('ButtonClose', ButtonClose, buttonCloseProps);

        postStore.on(PostStoreEvents.POST_ADD_SUCCESS, () => this.onAddPostSuccess());

        this.registerElementEvent('click', this.onAddPostClick, this.getAddNewPostButtonElement);
        this.registerElementEvent('change', this.onPostTextChange, this.getPostTextAreaElement);
        this.registerElementEvent('click', this.onModalClose, this.getCloseModalDivElement);
        this.registerElementEvent('click', this.onModalClose, this.getCloseModalButtonElement)
        this.registerElementEvent('click', this.onAttachImageClick, this.getAttachContentElement);
        this.registerElementEvent('click', this.onDeleteAllImagesClick, this.getDeleteAllImagesButtonElement);
        this.registerElementEvent('click', this.onEditAllImagesClick, this.getEditAllImagesButtonElement);


        this.registerElementEvent('click', this.onEndPostEdit, this.getEndPostEditButtonElement);
    }

    onPostTextChange() {
        const postText = this.getPostTextAreaElement().value;
        this.setState({postText});
    }

    onEndPostEdit() {
        this.updateState({postEditing: false});
    }

    onAddPostSuccess() {
        this.clearPostData();
        this.onModalClose();
    }

    onModalClose() {
        this.props.onModalClose();
    }

    onAddPostClick() {
        const text = this.state.postText.replace(/<\/?[^>]+(>|$)/g, '');
        const currentDate = new Date();
        const date = currentDate.getDay() + '.' + currentDate.getMonth() + '.' + currentDate.getFullYear();
        const user = userStore.getState();
        const imgAvatar = user.imgAvatar;
        const postCreator = user.firstName + ' ' + user.lastName;
        this.dispatchUserAction(UserActions.NEW_POST, {
            text,
            date,
            imgAvatar,
            postCreator,
            attached: this.state.files
        });
    }

    onAttachImageClick() {
        const inputPostImg = document.createElement('input');
        inputPostImg.type = 'file';
        inputPostImg.onchange = () => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const img = event.target.result;
                this.updateState({contentUrls: this.state.contentUrls.concat(img)});
            };

            const imgContentFile = inputPostImg.files[0];
            this.updateState({files: this.state.files.concat(imgContentFile)});
            reader.readAsDataURL(imgContentFile);
        };
        inputPostImg.click();
    }

    onEditAllImagesClick() {
        this.updateState({postEditing: true});
    }

    onDeleteAllImagesClick() {
        this.updateState({
            contentUrls: [],
            files: []
        });
    }

    clearPostData() {
        this.setState({
            postEditing: false,
            postText: '',
            contentUrls: [],
            files: []
        });
    }

    deleteAttachmentById(id) {
        this.state.contentUrls.splice(id, 1);
        this.state.files.splice(id, 1);
        this.updateState({});
    }

    getAddNewPostButtonElement() {
        return this.element.getElementsByClassName('new-post__add-btn')[0];
    }

    getPostTextAreaElement() {
        return this.element.getElementsByClassName('new-post-text')[0];
    }

    getEndPostEditButtonElement() {
        return this.element.getElementsByClassName('btn-edit-post-end')[0];
    }

    getCloseModalDivElement() {
        return this.element.getElementsByClassName('modal-bg-close')[0];
    }

    getCloseModalButtonElement() {
        return this.element.getElementsByClassName('close-post-modal-btn')[0];
    }

    getAttachContentElement() {
        return this.element.getElementsByClassName('attach__photo')[0];
    }

    getDeleteAllImagesButtonElement() {
        return this.element.getElementsByClassName('del-all-images-btn')[0];
    }

    getEditAllImagesButtonElement() {
        return this.element.getElementsByClassName('edit-all-images-btn')[0];
    }
}