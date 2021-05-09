import {Component} from "../../modules/Component";
import {UserActions} from "../../actions/UserActions";
import * as albumPreviewTemplate from './AlbumPreview.tmpl';
import './AlbumPreview.sass';

export class AlbumPreview extends Component {
    constructor(props) {
        super(albumPreviewTemplate, props);

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