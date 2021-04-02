import {addLoginFormListeners} from "../../components/LoginForm/handler.js";

export default class LoginPage {
    state = {

    }

    render() {
        application.innerHTML = loginpageTemplate(this.state);
        this.addListeners()
    }

    addListeners() {
        addLoginFormListeners();
    }
}

