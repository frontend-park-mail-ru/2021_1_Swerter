import {Component} from "../../modules/Component.js";
import {UserActions} from "../../actions/UserActions.js";
import friendStore from "../../Stores/FriendStore.js";
import {FriendStoreEvents} from '../../consts/events.js';

export class Friend extends Component {
    constructor(props) {
        super(friendTemplate, props);

        this.state = {
            isFriend: this.props.isFriend,
            avatar: this.props.imgAvatar,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            searched: this.props.searched,
            id: this.props.id
        };

        this.registerElementEvent('click', this.onAddClick, this.getAddFriendButtonElement);

        friendStore.on(FriendStoreEvents.ADD_FRIEND_REQUEST_SUCCESS, (data) => this.onFriendAddSuccess(data));
    }

    onFriendAddSuccess({id}) {
        if (id === this.state.id) {
            this.updateState({isFriend: true});
        }
    }

    onAddClick() {
        this.dispatchUserAction(UserActions.ADD_FRIEND, {id: this.state.id});
    }

    getAddFriendButtonElement() {
        return this.element.getElementsByClassName('action-friend-btn')[0];
    }

}