import {addRegisterFormListeners} from "../../components/RegisterForm/handler.js";

export default class RegisterPage {
    state = {}

    render() {
        application.innerHTML = registerpageTemplate(this.state);
        this.addListeners()
    }

    addListeners() {
        addRegisterFormListeners();
    }
}