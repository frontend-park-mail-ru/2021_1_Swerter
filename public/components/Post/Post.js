import {Component} from "../../modules/Component";
import {PostStoreEvents} from "../../consts/events";
import {UserActions} from "../../actions/UserActions";
import postStore from "../../Stores/PostStore";
import {ShowImgModal} from "../ShowImgModal/ShowImgModal";
import * as postTemplate from './Post.tmpl';
import './Post.sass';

export class Post extends Component {
    constructor(props) {
        super(postTemplate, props);

        this.state = {
            showModal: false,
            selectedImgIndex: 0
        };

        Object.assign(this.state, props);

        const showImgModalProps = {
            images: this.state.imgContent,
            _onClose: () => this.updateState({showModal: false}),
            hideThis(element) {
                this._onClose();
                element.hide();
            }
        };
        this.registerChildComponent('ShowImgModal', ShowImgModal, showImgModalProps);

        this.registerElementEvent('click', this.onLikeClick, this.getLikeButtonElement);
        this.registerElementEvent('click', this.onPostContentClick, this.getPostContentElement);

        postStore.on(PostStoreEvents.POST_LIKE_SUCCESS, ({postId}) => {
            this.onLikeSuccess(postId);
        });
    }

    onPostContentClick(event) {
        const element = event.target;
        if (element.tagName === 'IMG') {
            this.updateState({selectedImgIndex: element.getAttribute('index'), showModal: true});
        }
    }

    onLikeClick() {
        this.dispatchUserAction(UserActions.LIKE_POST, {postId: this.state.ID});
    }

    onLikeSuccess(postId) {
        if (postId === this.state.ID) {
            if (this.state.liked) {
                this.updateState({liked: !this.state.liked, likeCounter: this.state.likeCounter - 1});
            } else {
                this.updateState({liked: !this.state.liked, likeCounter: this.state.likeCounter + 1});
            }
        }
    }

    getPostContentElement() {
        return this.element.getElementsByClassName('post__content')[0];
    }

    getLikeButtonElement() {
        return this.element.getElementsByClassName('post__footer__column__like')[0];
    }
}
