import {Component} from "../../view/Component.js";
import Dispatcher from "../../modules/dispatcher.js";

export class LoginForm extends Component {
    constructor() {
        super(loginformTemplate);

        this.addEvent(
            'click',
            this.onSubmit,
            () => this.element.getElementsByClassName('login-form__button-login')[0]
        );
    }

    onSubmit() {
        const login = this.element.getElementsByClassName('login-form__input_login')[0];
        const password = this.element.getElementsByClassName('login-form__input_password')[0];

        let errorMsg = null;
        if (login.checkValidity() !== true) {
            errorMsg = 'Wrong login format';
        } else if (password.checkValidity() !== true) {
            errorMsg = 'Wrong password format';
        }

        if (errorMsg) {
            this.displayValidationError(errorMsg);
            return;
        }

        Dispatcher.dispatch('send-login-request', {
            login: login.value,
            password: password.value
        })
    }

    displayValidationError(error) {
        if (Array.from(this.element.getElementsByClassName('login-form__div-error')).length === 0) {
            const sib = this.element.getElementsByClassName('login-form__div-item')[0];
            const par = sib.parentNode;
            const errorBox = document.createElement('div');
            errorBox.className = 'login-form__div-error';
            errorBox.innerHTML = `<h2>${error}</h2>`;
            par.insertBefore(errorBox, sib);
        } else {
            const errorBox = document.getElementsByClassName('login-form__div-error').item(0);
            errorBox.innerHTML = `<h2>${error}</h2>`;
        }
    }
}