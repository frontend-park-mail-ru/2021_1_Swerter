import {Component} from "../../modules/Component";
import './AlbumsPhoto.css';

const albumPhotoTemplate = ({src}) => `<img class=album-photo src=${src}>`;

export class AlbumPhoto extends Component {
    constructor(props) {
        super(albumPhotoTemplate, props);

        this.state = {
            src: this.props.src
        }
    }
}