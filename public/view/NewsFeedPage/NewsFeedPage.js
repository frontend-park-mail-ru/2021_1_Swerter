import {Component} from "../../modules/Component.js";
import {Post} from "../../components/Post/Post.js";
import {Header} from "../../components/Header/Header.js";
import postStore from "../../Stores/PostStore.js";
import {PostStoreEvents} from "../../consts/events.js";

class NewsFeedPage extends Component {
    constructor(props) {
        super(newsfeedpageTemplate, props);

        this.state = {
            postsData: []
        };

        this.registerChildComponent('Header', Header);
        this.registerChildComponent('Post', Post);

        postStore.on(PostStoreEvents.POSTS_REQUEST_SUCCESS, () => this.onPostsRequestSuccess());

        this.onPostsRequestSuccess();
    }

    onPostsRequestSuccess() {
        const postsData = postStore.getState();
        this.updateState({postsData});
    }
}

const newsFeedPage = new NewsFeedPage();

export default newsFeedPage;
