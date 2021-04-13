import {addHeaderListeners} from "../../components/Header/handler.js";
import postStore from "../../Stores/PostStore.js";
import {http} from "../../modules/http.js";
//Котсыль пока не знаю как хедер вынести
import profilePage from "../Profile/ProfilePage.js";
import makeObservable from "../../observable.js";
import {router} from "../../modules/router.js";

postStore.bind('new-news', () => {
    newsFeedPage.emit('new-news-getted');
});

class NewsFeedPage {
    state = {
        postsData: []
    }

    constructor() {
        this.registerEvents();
    }

    render() {

        //Котысль хедера
        this.state.userData = profilePage.state.userData
        this.state.viewState = profilePage.state.viewState

        postStore.bind('init-news', () => {
            this.state.postsData = postStore.newsPosts;
        });
        application.innerHTML = newsfeedTemplate(this.state);

        this.addListeners()
    }

    addListeners() {
        addHeaderListeners();
    }

    registerEvents() {
        this.bind('new-news-getted', () => {
            this.state.postsData = postStore.newsPosts;
        });
    }
}

makeObservable(NewsFeedPage);
const newsFeedPage = new NewsFeedPage();

export default newsFeedPage;