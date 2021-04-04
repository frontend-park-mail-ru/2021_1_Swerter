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
        postStore.getNewsPosts().then((posts) => {
            posts = this.postsObjToList(posts).map((item) => {
                let urlImg = http.getHost() + '/static/usersAvatar/';
                urlImg += item.imgAvatar ? item.imgAvatar : 'defaultUser.jpg';
                item.imgAvatar = urlImg;
                return item;
            });

            this.state.postsData = posts
        });
    }

    postsObjToList (posts) {
        const listPosts = [];
        for (const key in posts) {
            posts[key].imgContent = posts[key].imgContent ? http.getHost() + posts[key].imgContent : '';
            listPosts.push(posts[key]);
        }
        return listPosts.reverse();
    }


    render() {
        //Достать из рендера
        //Котысль хедера
        this.state.userData = profilePage.state.userData
        this.state.viewState = profilePage.state.viewState

        this.getNews();
        console.log(this.state)
        application.innerHTML = newsfeedTemplate(this.state);

        this.addListeners()
    }

    addListeners() {
        addHeaderListeners();
    }
}