import {Component} from "../../modules/Component.js";
import {UserActions} from "../../actions/UserActions.js";

export class AlbumPreview extends Component {
    constructor(props) {
        super(albumpreviewTemplate, props);

        this.state = {
            id: this.props.id,
            src: this.props.src,
            title: this.props.title
        }

        this.registerElementEvent('click', this.onClick);
    }

    onClick() {
        this.dispatchUserAction(UserActions.ALBUM_REQUEST, {id: this.state.id});
    }
}