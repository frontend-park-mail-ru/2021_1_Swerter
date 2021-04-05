import Dispatcher from '../dispatcher.js';
import {http} from '../modules/http.js';
import makeObservable from '../observable.js';
import postStore from "./PostStore.js";

class UserStore {
    constructor() {
        this.user = {}
    }

    async getProfile() {
        const response = await http.get({url: '/profile'});
        const userData = response.body;
        return userData;
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
        return response
    }

    async sendLoginRequest(creds) {
        const response = await http.post({url: '/login', data: JSON.stringify(creds)});
        return response;
    }

    async sendLogoutRequest(creds) {
        const response = await http.post({url: '/logout'});
        return response;
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

Dispatcher.register('send-login-request', (details) => {
    userStore.sendLoginRequest(details).then((response) => {
            if (response.status === 200) {
                userStore.getProfile().then((userData) => {
                        userStore.user.firstName = userData['firstName'];
                        userStore.user.lastName = userData['lastName'];
                        let imgAvatar = http.getHost() + '/static/usersAvatar/';
                        imgAvatar += userData['avatar'] ? userData['avatar'] : 'defaultUser.jpg';
                        userStore.user.imgAvatar = imgAvatar;

                        //Считаю что store ьогут знать друг о друге
                        postStore.userPosts = userData['postsData'];
                        userStore.emit('authorized')
                        postStore.emit('authorized')
                    }
                )
            } else if (response.status === 403) {
                userStore.emit('send-login-request-failed')
            }
        }
    );
});


Dispatcher.register('logout', (details) => {
    userStore.sendLogoutRequest().then(response=>{
        if (response.status === 200) {
            userStore.user.firstName = '';
            userStore.user.lastName = '';
            userStore.user.imgAvatar = '';
            userStore.emit('logouted');
        }
    })
});

// Dispatcher.register('go-friend-profile', (details) => {
//     userStore.getProfile().then((response) => {
//             userStore.emit('friend-page-getted');
//         }
//     );
// });


export default userStore;
