import {Component} from "../../modules/Component.js";
import {Post} from "../../components/Post/Post.js";
import {Header} from "../../components/Header/Header.js";

class NewsFeedPage extends Component {
    constructor() {
        super(newsfeedpageTemplate);

        this.state = {
            posts: []
        };

        this.addChildren('header', Header);
        this.addChildren('post', Post);
    }
}

const newsFeedPage = new NewsFeedPage();

export default newsFeedPage;
