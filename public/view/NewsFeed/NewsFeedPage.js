import {addHeaderListeners} from "../../components/Header/handler.js";
import postStore from "../../Stores/PostStore.js";
import {http} from "../../modules/http.js";
//Котсыль пока не знаю как хедер вынести
import profilePage from "../Profile/ProfilePage.js";

export default class NewsFeedPage {
    state = {
        postsData: []
    }

    getNews() {
        const posts = this.postsObjToList(postStore.newsPosts).map((item) => {
            let urlImg = http.getHost() + '/static/usersAvatar/';
            urlImg += item.imgAvatar ? item.imgAvatar : 'defaultUser.jpg';
            item.imgAvatar = urlImg;
            return item;
        });
        console.log(this)
        this.state.postsData = posts
    }

    postsObjToList(posts) {
        const listPosts = [];
        for (const key in posts) {
            posts[key].imgContent = posts[key].imgContent ? http.getHost() + posts[key].imgContent : '';
            listPosts.push(posts[key]);
        }
        return listPosts.reverse();
    }

    constructor() {
        postStore.bind('init-news', () => {
            this.getNews();
        });
    }

    render() {
        //Котысль хедера
        this.state.userData = profilePage.state.userData
        this.state.viewState = profilePage.state.viewState

        application.innerHTML = newsfeedTemplate(this.state);

        this.addListeners()
    }

    addListeners() {
        addHeaderListeners();
    }
}