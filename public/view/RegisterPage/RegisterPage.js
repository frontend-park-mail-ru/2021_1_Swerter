import {Component} from "../../modules/Component.js";
import {RegisterForm} from "../../components/RegisterForm/RegisterForm.js";
import userStore from "../../Stores/UserStore.js";

class RegisterPage extends Component {
    constructor(props) {
        super(registerpageTemplate, props);

        this.registerChildComponent('RegisterForm', RegisterForm);
    }

    allowed() {
        return !userStore.isUserAuthorized();
    }
}

const registerPage = new RegisterPage();

export default registerPage;
