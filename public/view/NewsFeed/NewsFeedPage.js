import {addHeaderListeners} from "../../components/Header/handler.js";


export default class NewsFeedPage {
    state = {
        postsData: [],
        userData: {
            login: 'login',
            password: 'password',
            firstName: 'Dima',
            lastName: 'Akzhigitov',
            imgBg: './assets/imgContent.jpg',
            imgAvatar: './assets/imgLogo.jpg',
            modEdited: false,
            myPage: true,
            needUpdate: false,
        },
    }

    render() {
        application.innerHTML = newsfeedTemplate(this.state);
        this.addListeners()
    }

    addListeners() {
        addHeaderListeners();
    }
}