import {Component} from "../../modules/Component";
import {UserActions} from "../../actions/UserActions";
import userStore from "../../Stores/UserStore";
import {UserStoreEvents} from "../../consts/events";
import * as registerFormTemplate from './RegisterForm.tmpl';
import './RegisterForm.css';

export class RegisterForm extends Component {
    constructor(props) {
        super(registerFormTemplate, props);
        this.state = {
            login: '',
            password: '',
            passwordRepeat: '',
            firstName: '',
            lastName: ''
        };

        this.registerElementEvent('change', this.onChange);
        this.registerElementEvent('click', this.onRegisterClick, this.getRegisterButtonElement);
        this.registerElementEvent('click', this.onCloseClick, this.getCloseButtonElement);

        userStore.on(UserStoreEvents.LOGIN_SUCCESS, () => {
            this.clearForm();
        });
    }

    onRegisterClick() {
        const validationError = this.checkFormValidity();
        if (validationError !== '') {
            this.displayValidationError(validationError);
            return;
        }

        const formData = this.getFormData();
        this.dispatchUserAction(UserActions.REGISTER_REQUEST, formData);
    }

    onCloseClick() {
        this.dispatchUserAction(UserActions.REGISTER_FORM_CLOSE);
    }

    onChange() {
        const login = this.getLoginInputElement().value;
        const password = this.getPasswordInputElement().value;
        const passwordRepeat = this.getPasswordRepeatInputElement().value;
        const firstName = this.getFirstNameInputElement().value;
        const lastName = this.getLastNameInputElement().value;

        this.setState({login, password, passwordRepeat, firstName, lastName});
    }

    checkFormValidity() {
        const login = this.getLoginInputElement();
        const password = this.getPasswordInputElement();
        const passwordRepeat = this.getPasswordRepeatInputElement();
        const firstName = this.getFirstNameInputElement();
        const lastName = this.getLastNameInputElement();

        let errorMsg = '';
        if (login.checkValidity() !== true) {
            errorMsg = 'Wrong login format';
        } else if (password.checkValidity() !== true) {
            errorMsg = 'Password must contain at least 8 symbols (digits and' +
                ' characters)';
        } else if (password.value !== passwordRepeat.value) {
            errorMsg = 'Passwords must match';
        } else if (firstName.checkValidity() !== true) {
            errorMsg = `Firstname can't be empty`;
        } else if (lastName.checkValidity() !== true) {
            errorMsg = `Lastname can't be empty`;
        }

        return errorMsg;
    }

    getFormData() {
        const login = this.state.login;
        const password = this.state.password;
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;

        return {login, password, firstName, lastName};
    }

    displayValidationError(error) {
        let errorBox = this.getErrorBoxElement();

        if (errorBox === undefined) {
            errorBox = document.createElement('div');
            errorBox.className = 'register-form__div-error';
            this.getLoginInputElement().insertAdjacentElement('beforebegin', errorBox);
        }

        errorBox.innerHTML = `<h2>${error}</h2>`;
    }

    getRegisterButtonElement() {
        return this.element.getElementsByClassName('register-form__button-register')[0];
    }

    getCloseButtonElement() {
        return this.element.getElementsByClassName('register-form__div-close')[0];
    }

    getLoginInputElement() {
        return this.element.getElementsByClassName('register-form__login')[0];
    }

    getPasswordInputElement() {
        return this.element.getElementsByClassName('register-form__password')[0];
    }

    getPasswordRepeatInputElement() {
        return this.element.getElementsByClassName('register-form__password-repeat')[0];
    }

    getFirstNameInputElement() {
        return this.element.getElementsByClassName('register-form__firstname')[0];
    }

    getLastNameInputElement() {
        return this.element.getElementsByClassName('register-form__lastname')[0];
    }

    getErrorBoxElement() {
        return this.element.getElementsByClassName('register-form__div-error')[0];
    }

    clearForm() {
        this.updateState({
            login: '',
            password: '',
            passwordRepeat: '',
            firstName: '',
            lastName: ''
        });
    }
}
