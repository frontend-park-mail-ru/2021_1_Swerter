import {Component} from "../../modules/Component.js";
import {SiteDescription} from "../../components/SiteDescription/SiteDescription.js";
import {LoginForm} from "../../components/LoginForm/LoginForm.js";
import userStore from "../../Stores/UserStore.js";

export class LoginPage extends Component {
    constructor(props) {
        super(loginpageTemplate, props);

        this.registerChildComponent('SiteDescription', SiteDescription);
        this.registerChildComponent('LoginForm', LoginForm);
    }

    allowed() {
        return !userStore.isUserAuthorized();
    }
}

const loginPage = new LoginPage();

export default loginPage;
