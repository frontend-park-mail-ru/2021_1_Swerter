import {addRegisterFormListeners} from "../../components/RegisterForm/handler.js";
import makeObservable from "../../modules/observable.js";


class RegisterPage {
    state = {}


    constructor() {
        this.registerEvents()
    }

    render() {
        application.innerHTML = registerpageTemplate(this.state);
        this.addListeners()
    }

    addListeners() {
        addRegisterFormListeners();
    }

    registerEvents() {
        this.bind('authorized', () => {
            router.go('/profile');
        });
    }
}


makeObservable(RegisterPage)
const registerPage = new RegisterPage();

export default registerPage
