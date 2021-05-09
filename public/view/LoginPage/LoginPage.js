import {Component} from "../../modules/Component";
import {SiteDescription} from "../../components/SiteDescription/SiteDescription";
import {LoginForm} from "../../components/LoginForm/LoginForm";
import userStore from "../../Stores/UserStore";
import * as loginPageTemplate from './LoginPage.tmpl';
import './LoginPage.css';

export class LoginPage extends Component {
    constructor(props) {
        super(loginPageTemplate, props);

        this.registerChildComponent('SiteDescription', SiteDescription);
        this.registerChildComponent('LoginForm', LoginForm);
    }

    allowed() {
        return !userStore.isUserAuthorized();
    }
}

const loginPage = new LoginPage();

export default loginPage;
