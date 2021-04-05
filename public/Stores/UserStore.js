import Dispatcher from '../dispatcher.js';
import {http} from '../modules/http.js';
import makeObservable from '../observable.js';

class UserStore {
    constructor() {
        this.user = {};

        const responseAva = this.getAva().then((url) => {
            this.user.imgAvatar = url;
        });
        const responseName = this.getName().then((userInfo) => {
            this.user.firstName = userInfo.firstName;
            this.user.lastName = userInfo.lastName
        });
        Promise.all([responseAva, responseName]).then(() => {
            this.emit('init-user');
        });
    }

    async getAva() {
        const userData = await http.get({url: '/profile'});
        let imgAvatar = http.getHost() + '/static/usersAvatar/';
        imgAvatar += userData.body['avatar'] ? userData.body['avatar'] : 'defaultUser.jpg';
        console.log(imgAvatar)
        return imgAvatar;
    }

    async getName() {
        const userData = await http.get({url: '/profile'});
        const firstName = userData.body['firstName'];
        const lastName = userData.body['firstName'];
        const user = {firstName, lastName};
        return user;
    }

    async uploadAva(imgInfo) {
        const formData = new FormData();
        const imgContent = imgInfo.imgAvaFile;
        formData.append('avatar', imgContent);
        const response = http.post({url: '/profile/loadImg', data: formData, headers: {}});
        return response;
    }

    async uploadName(newUserInfo) {
        const response = http.post({
            url: '/profile', data: JSON.stringify({
                firstName: newUserInfo.firstName,
                lastName: newUserInfo.lastName,
            }),
        });
        return response
    }

    async uploadLogin(newLogin) {
        const response = await http.post({
            url: '/profile',
            data: JSON.stringify({login: newLogin.login}),
        });
        return response
    }

    async uploadPassword(newPassword) {
        const response = await http.post({
            url: '/profile',
            data: JSON.stringify({
                'password': newPassword.password,
                'oldPassword': newPassword.oldPassword,
            }),
        });
        return  response
    }
}

// async getProfile(imgInfo) {
//     const formData = new FormData();
//     const imgContent = imgInfo.imgAvaFile;
//     formData.append('avatar', imgContent);
//     const response = http.post({url: '/profile/loadImg', data: formData, headers: {}});
//     return response;
// }

makeObservable(UserStore);
const userStore = new UserStore();

Dispatcher.register('upload-ava', (details) => {
    userStore.uploadAva(details.imgInfo).then((response) => {
            userStore.getAva().then((avaUrl) => {
                userStore.user.imgAvatar = avaUrl;
                userStore.emit('ava-uploaded');
            })
        }
    );
});

Dispatcher.register('new-name', (details) => {
    userStore.uploadName(details).then(() => {
            userStore.user.firstName = details.firstName;
            userStore.user.lastName = details.lastName;
            userStore.emit('new-name-setted')
        }
    );
});

Dispatcher.register('new-login', (details) => {
    userStore.uploadLogin(details).then((response) => {
            if (response.status === 200) {
                userStore.emit('new-login-setted')
            } else {
                userStore.emit('new-login-failed')
            }
        }
    );
});

Dispatcher.register('new-password', (details) => {
    userStore.uploadPassword(details).then((response) => {
            if (response.status === 200) {
                userStore.emit('new-password-setted')
            } else if (response.status === 403) {
                userStore.emit('new-password-failed')
            }
        }
    );
});

// Dispatcher.register('go-friend-profile', (details) => {
//     userStore.getProfile().then((response) => {
//             userStore.emit('friend-page-getted');
//         }
//     );
// });


export default userStore;
