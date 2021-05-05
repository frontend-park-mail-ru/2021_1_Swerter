import {Component} from "../../modules/Component.js";
import userStore from "../../Stores/UserStore.js";
import {PostStoreEvents, UserStoreEvents} from "../../consts/events.js";
import {UserActions} from "../../actions/UserActions.js";
import postStore from "../../Stores/PostStore.js";

export class Post extends Component {
    constructor(props) {
        super(postTemplate, props);

        Object.assign(this.state, props);

        userStore.on(UserStoreEvents.STORE_CHANGED, () => this.userStoreChanged());
        postStore.on(PostStoreEvents.POST_LIKE_SUCCESS, ({postId}) => {this.onLikeSuccess(postId)})

        this.registerElementEvent('click', this.onLikeClick, this.getLikeButtonElement);

        this.userStoreChanged();
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

    userStoreChanged() {
        const {imgAvatar} = userStore.getState();
        this.updateState({imgAvatar});
    }

    getLikeButtonElement() {
        return this.element.getElementsByClassName('post__footer__column__like')[0];
    }
}
