import {Component} from "../../modules/Component";
import {UserActions} from "../../actions/UserActions";
import * as searchFriendTemplate from './SearchFriend.tmpl';
import './SearchFriend.sass';

export class SearchFriend extends Component {
    constructor(props) {
        super(searchFriendTemplate, props);

        this.state = {
            firstName: '',
            lastName: ''
        };

        this.registerElementEvent('click', this.onSearch, this.getSearchFriendButtonElement);
        this.registerElementEvent('change', this.onChange, this.getSearchFriendInputElement);
    }

    onChange() {
        const [firstName, lastName] = this.getSearchFriendInputElement().value.replace(/<\/?[^>]+(>|$)/g, '')
            .split(' ');

        this.setState({
            firstName,
            lastName: lastName === undefined ? '' : lastName
        });
    }

    onSearch() {
        this.dispatchUserAction(UserActions.SEARCH_FRIEND, {
            firstName: this.state.firstName,
            lastName: this.state.lastName
        });
    }

    getSearchFriendInputElement() {
        return this.element.getElementsByClassName('search-friend-input')[0];
    }

    getSearchFriendButtonElement() {
        return this.element.getElementsByClassName('search-friend-btn')[0];
    }

}