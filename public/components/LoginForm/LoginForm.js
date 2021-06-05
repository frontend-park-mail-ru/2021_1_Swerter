import {Component} from "../../modules/Component";
import {UserActions} from "../../actions/UserActions";
import userStore from "../../Stores/UserStore";
import {UserStoreEvents} from '../../consts/events';
import * as loginFormTemplate from './LoginForm.tmpl';
import './LoginForm.sass';

export class LoginForm extends Component {
    constructor(props) {
        super(loginFormTemplate, props);
        this.state = {
            login: '',
            password: ''
        };

        this.registerElementEvent('change', this.onChange);
        this.registerElementEvent('click', this.onLoginClick, this.getLoginButtonElement);
        this.registerElementEvent('click', this.onRegisterClick, this.getRegisterButtonElement);
        
        userStore.on(UserStoreEvents.LOGIN_FAILED, () => {
            this.displayFormError('Login failed');
        });

        userStore.on(UserStoreEvents.LOGIN_SUCCESS, () => {
            this.clearForm();
        });
    }

    onLoginClick() {
        const validationError = this.checkFormValidity();
        if (validationError !== '') {
            this.displayFormError(validationError);
            return;
        }

        const formData = this.getFormData();
        this.dispatchUserAction(UserActions.LOGIN_REQUEST, formData);
    }

    onChange() {
        const login = this.getLoginInputElement().value;
        const password = this.getPasswordInputElement().value;

        this.setState({login, password});
    }

    onRegisterClick() {
        this.dispatchUserAction(UserActions.GO_REGISTER);
    }

    checkFormValidity() {
        const login = this.getLoginInputElement();
        const password = this.getPasswordInputElement();

        let errorMsg = '';
        if (login.checkValidity() !== true) {
            errorMsg = 'Wrong login format';
        } else if (password.checkValidity() !== true) {
            errorMsg = 'Wrong password format';
        }

        return errorMsg;
    }

    getFormData() {
        const login = this.state.login;
        const password = this.state.password;

        return {login, password};
    }

    displayFormError(error) {
        let errorBox = this.getErrorBoxElement();

        if (errorBox === undefined) {
            errorBox = document.createElement('div');
            errorBox.className = 'login-form__div-error';
            this.element.insertAdjacentElement('afterbegin', errorBox);
        }

        errorBox.innerHTML = `<h2>${error}</h2>`;
    }

    getLoginButtonElement() {
        return this.element.getElementsByClassName('login-form__button-login')[0];
    }

    getRegisterButtonElement() {
        return this.element.getElementsByClassName('login-form__button-register')[0];
    }

    getLoginInputElement() {
        return this.element.getElementsByClassName('login-form__input_login')[0];
    }

    getPasswordInputElement() {
        return this.element.getElementsByClassName('login-form__input_password')[0];
    }

    getErrorBoxElement() {
        return this.element.getElementsByClassName('login-form__div-error')[0];
    }

    clearForm() {
        this.updateState({login: '', password: ''});
    }
}