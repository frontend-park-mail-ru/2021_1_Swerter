import {addLoginFormListeners} from "../../components/LoginForm/handler.js";
import {router} from "../../modules/router.js";
import makeObservable from "../../observable.js";

class LoginPage {
    state = {

    }

    constructor() {
        this.registerEvents()
    }

    render() {
        application.innerHTML = loginpageTemplate(this.state);
        this.addListeners()
    }

    addListeners() {
        addLoginFormListeners();
    }

    registerEvents() {
        this.bind('authorized', () => {
            // router.go('/profile');
        });
    }
}

makeObservable(LoginPage)
const loginPage = new LoginPage();

export default loginPage
