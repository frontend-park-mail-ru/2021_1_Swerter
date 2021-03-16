(function () {
    function closeModal() {
        profileData.userData.editCreds = false;
        profileData.userData.changeLogin = false;
        profileData.userData.changePassword = false;

        router.goProfile();
    }

    function displayValidationError(prev, error) {
        if (Array.from(
            document.getElementsByClassName('div-error')).length === 0) {
            const sib = document.getElementById(prev);
            const par = sib.parentNode;
            const errorBox = document.createElement('div');
            errorBox.className = 'div-error';
            errorBox.innerHTML = `<h2>${error}</h2>`;
            par.insertBefore(errorBox, sib);
        } else {
            const errorBox = document.getElementsByClassName('div-error')
                .item(0);
            errorBox.innerHTML = `<h2>${error}</h2>`;
        }
    }

    async function submitChangeLogin() {
        const loginEl = document.getElementById('input-new-login');
        const login = loginEl.value.replace(/<\/?[^>]+(>|$)/g, '');

        if (loginEl.checkValidity() !== true) {
            displayValidationError('input-new-login', 'Wrong login format');
            return;
        }

        result = await window.http.post({
            url: '/profile',
            data: JSON.stringify({login}),
        });
        if (result.status === 200) {
            profileData.userData.changeLogin = false;
            router.goProfile({needUpdate: false});
        } else {
            displayValidationError('input-new-login',
                'Server error, try again' +
                ' later');
        }
    }

    async function submitChangePassword() {
        const oldPasswordEl = document.getElementById('input-old-password');
        const oldPassword = oldPasswordEl.value.replace(/<\/?[^>]+(>|$)/g, '');

        const newPasswordEl = document.getElementById('input-new-password');
        const newPassword = newPasswordEl.value.replace(/<\/?[^>]+(>|$)/g, '');

        const repNewPasswordEl = document.getElementById('input-new-password-repeat');
        const repNewPassword = repNewPasswordEl.value.replace(/<\/?[^>]+(>|$)/g,
            '');

        if (oldPasswordEl.checkValidity() !== true || newPasswordEl.checkValidity() !== true
            || repNewPasswordEl.checkValidity() !== true) {
            displayValidationError('input-old-password', 'Wrong password' +
                ' format: password must contain' +
                ' at' +
                ' least 8 symbols (digits and characters)');
        } else if (newPassword !== repNewPassword) {
            displayValidationError('input-old-password',
                'Passwords must match');
        } else {
            result = await window.http.post({
                url: '/profile',
                data: JSON.stringify({
                    'password': newPassword,
                    oldPassword,
                }),
            });
            if (result.status === 200) {
                profileData.userData.changePassword = false;
                router.goProfile({needUpdate: false});
            }
        }
    }

    window.submitChangePassword = submitChangePassword;
    window.submitChangeLogin = submitChangeLogin;
    window.closeModal = closeModal;
})();
