import {Component} from "../Component.js";
import {SiteDescription} from "../../components/SiteDescription/SiteDescription.js";
import {LoginForm} from "../../components/LoginForm/LoginForm.js";

export class LoginPage extends Component {
    constructor() {
        super(loginpageTemplate);

        this.addChildren('siteDescription', SiteDescription);
        this.addChildren('loginForm', LoginForm);
    }
}
