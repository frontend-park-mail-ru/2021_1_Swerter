import {Component} from "../../modules/Component";
import {UserActions} from "../../actions/UserActions";
import userStore from "../../Stores/UserStore";
import {UserStoreEvents} from "../../consts/events";
import * as configModalTemplate from './ConfigModal.tmpl';
import './ConfigModal.css';

export class ConfigModal extends Component {
    constructor(props) {
        super(configModalTemplate, props);

        this.state = {
            mode: this.props.mode,
            login: '',
            oldPassword: '',
            newPassword: '',
            passwordRepeat: ''
        };

        this.registerElementEvent('change', this.onChange);

        this.registerElementEvent('click', this.onCloseClick, this.getCloseButtonElement);
        this.registerElementEvent('click', this.onSubmitPasswordClick, this.getSubmitButtonElement);
        this.registerElementEvent('click', this.onSubmitLoginClick, this.getSubmitButtonElement);

        userStore.on(UserStoreEvents.PROFILE_UPDATE_SUCCESS, () => this.onCloseClick());
        userStore.on(UserStoreEvents.PROFILE_UPDATE_FAILED, () => this.displayValidationError('Wrong password!'));
    }

    onCloseClick() {
        this.props.onClose();
    }

    onChange() {
        switch (this.state.mode) {
            case 'PASSWORD':
                const oldPassword = this.getOldPasswordInputElement().value;
                const password = this.getPasswordInputElement().value;
                const passwordRepeat = this.getPasswordRepeatInputElement().value;
                this.setState({oldPassword, password, passwordRepeat});
                break;

            case 'LOGIN':
                const login = this.getLoginInputElement().value;
                this.setState({login});
                break;
        }
    }

    onSubmitLoginClick() {
        const validationError = this.checkFormValidity();
        if (validationError !== '') {
            this.displayValidationError(validationError);
            return;
        }

        const formData = {
            login: this.state.login
        };
        this.dispatchUserAction(UserActions.USER_PROFILE_UPDATE, formData);
    }

    onSubmitPasswordClick() {
        const validationError = this.checkFormValidity();
        if (validationError !== '') {
            this.displayValidationError(validationError);
            return;
        }

        const formData = {
            password: this.state.password,
            oldPassword: this.state.oldPassword
        };
        this.dispatchUserAction(UserActions.USER_PROFILE_UPDATE, formData);
    }

    checkFormValidity() {
        let errorMsg = '';

        switch (this.state.mode) {
            case 'PASSWORD':
                const oldPassword = this.getOldPasswordInputElement();
                const password = this.getPasswordInputElement();
                const passwordRepeat = this.getPasswordRepeatInputElement();

                if (oldPassword.checkValidity() !== true || password.checkValidity() !== true) {
                    errorMsg = 'Password must contain at least 8 symbols (digits and' +
                        ' characters)';
                } else if (password.value !== passwordRepeat.value) {
                    errorMsg = 'Passwords must match';
                }
                break;

            case 'LOGIN':
                const login = this.getLoginInputElement();
                if (login.checkValidity() !== true) {
                    errorMsg = 'Wrong login format';
                }
                break;
        }

        return errorMsg;
    }

    displayValidationError(error) {
        let errorBox = this.getErrorBoxElement();

        if (errorBox === undefined) {
            errorBox = document.createElement('div');
            errorBox.className = 'register-form__div-error';
            this.getFormHeaderElement().insertAdjacentElement('afterend', errorBox);
        }

        errorBox.innerHTML = `<h2>${error}</h2>`;
    }

    getFormHeaderElement() {
        return this.element.getElementsByClassName('register-form__header')[0];
    }

    getErrorBoxElement() {
        return this.element.getElementsByClassName('register-form__div-error')[0];
    }

    getCloseButtonElement() {
        return this.element.getElementsByClassName('register-form__img-close')[0];
    }

    getSubmitButtonElement() {
        return this.element.getElementsByClassName('register-form__button-register')[0];
    }

    getOldPasswordInputElement() {
        return this.element.getElementsByClassName('input-old-password')[0];
    }

    getPasswordInputElement() {
        return this.element.getElementsByClassName('input-new-password')[0];
    }

    getPasswordRepeatInputElement() {
        return this.element.getElementsByClassName('input-new-password-repeat')[0];
    }

    getLoginInputElement() {
        return this.element.getElementsByClassName('input-new-login')[0];
    }
}