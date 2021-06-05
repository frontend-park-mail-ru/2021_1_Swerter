import {Component} from "../../modules/Component";
import {RegisterForm} from "../../components/RegisterForm/RegisterForm";
import userStore from "../../Stores/UserStore";
import * as registerPageTemplate from './RegisterPage.tmpl';
import './RegisterPage.sass';

class RegisterPage extends Component {
    constructor(props) {
        super(registerPageTemplate, props);

        this.registerChildComponent('RegisterForm', RegisterForm);
    }

    allowed() {
        return !userStore.isUserAuthorized();
    }
}

const registerPage = new RegisterPage();

export default registerPage;
