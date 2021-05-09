import {Component} from "../../modules/Component";
import * as friendRequestTemplate from './FriendRequest.tmpl';
import './FriendRequest.css';

export class FriendRequest extends Component {
    constructor(props) {
        super(friendRequestTemplate, props);

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