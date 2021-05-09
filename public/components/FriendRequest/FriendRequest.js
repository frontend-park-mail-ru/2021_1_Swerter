import {Component} from "../../modules/Component.js";

export class FriendRequest extends Component {
    constructor(props) {
        super(friendrequestTemplate, props);

        this.state = {
            avatar: this.props.avatar,
            firstName: this.props.firstName,
            lastName: this.props.lastName
        };

        this.registerElementEvent('click', this.onAddFriend, this.getAddFriendButtonElement);
        this.registerElementEvent('click', this.onRemoveFriend, this.getRemoveFriendButtonElement);
    }

    onAddFriend() {
        this.props.onAddFriend(this.props.id);
    }

    onRemoveFriend() {
        this.props.onRemoveFriend(this.props.id);
    }

    getAddFriendButtonElement() {
        return this.element.getElementsByClassName('btn-add-friend')[0];
    }

    getRemoveFriendButtonElement() {
        return this.element.getElementsByClassName('btn-remove-friend')[0];
    }
}