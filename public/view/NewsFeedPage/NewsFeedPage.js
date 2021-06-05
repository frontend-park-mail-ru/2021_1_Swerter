import {Component} from "../../modules/Component";
import {Post} from "../../components/Post/Post";
import {Header} from "../../components/Header/Header";
import postStore from "../../Stores/PostStore";
import {PostStoreEvents} from "../../consts/events";
import userStore from "../../Stores/UserStore";
import * as newsFeedPageTemplate from './NewsFeedPage.tmpl';
import './NewsFeedPage.sass';

class NewsFeedPage extends Component {
    constructor(props) {
        super(newsFeedPageTemplate, props);

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

    allowed() {
        return userStore.isUserAuthorized();
    }
}

const newsFeedPage = new NewsFeedPage();

export default newsFeedPage;
