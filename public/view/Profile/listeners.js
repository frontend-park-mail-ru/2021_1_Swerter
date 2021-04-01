import {addCreatePostListeners} from "../../components/AddPost/handler.js";
import {addProfileHeaderListener} from "../../components/ProfileHeader/handler.js";
import {addChangeLoginListeners, addChangePassListeners} from "../../components/ConfigModal/handler.js";
import {addHeaderListeners} from "../../components/Header/handler.js";

export function addProfileListeners() {
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