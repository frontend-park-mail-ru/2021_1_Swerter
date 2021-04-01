import {addCreatePostListeners} from "../../components/AddPost/handler.js";
import {addProfileHeaderListener} from "../../components/ProfileHeader/handler.js";
import {addChangeLoginListeners, addChangePassListeners} from "../../components/ConfigModal/handler.js";
import {addHeaderListeners} from "../../components/Header/handler.js";


export default class Profile {
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
    };

    render() {
        window.application.innerHTML = profileTemplate(this.state);
        this.addListeners();
    }

    addListeners() {
        addHeaderListeners();
        addCreatePostListeners();
        addProfileHeaderListener();
        if (profileData.userData.changePassword) {
            addChangePassListeners();
        }
        if (profileData.userData.changeLogin) {
            addChangeLoginListeners();
        }
    }
}