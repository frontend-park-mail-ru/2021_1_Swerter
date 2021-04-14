import Dispatcher from '../dispatcher.js';
import {http} from '../modules/http.js';
import makeObservable from '../observable.js';
import postStore from "./PostStore.js";
import albumStore from './AlbumStore.js';

class UserStore {

    constructor() {
        this.user = {}
    }

    async getProfile() {
        const response = await http.get({url: '/profile'});
        const userData = response.body;
        return userData;
    }

    async getProfileFriend(id) {
        const response = await http.get({url: `/profile/id${id}`});
        console.log(`/profile/${id}`)
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

    async sendLogoutRequest() {
        const response = await http.post({url: '/logout'});
        return response;
    }

    async sendRegisterRequest(creds) {
        console.log(JSON.stringify(creds));
        const response = await http.post({url: '/register', data: JSON.stringify(creds)});
        return response;
    }

    setUserData(userData) {
        this.user.firstName = userData['firstName'];
        this.user.lastName = userData['lastName'];
        let imgAvatar = http.getHost() + '/static/usersAvatar/';
        imgAvatar += userData['avatar'] ? userData['avatar'] : 'defaultUser.jpg';
        this.user.imgAvatar = imgAvatar;
        const posts = userData['postsData']
        let listPosts = [];
        if (posts) {
            for (const key in posts) {
                let imgUrls = [];
                posts[key].imgContent.forEach((img)=>{
                    img.Url = http.getHost() + img.Url
                    imgUrls.push(img.Url)
                })
                posts[key].imgContent = imgUrls
                listPosts.push(posts[key]);
            }
        }
        postStore.userPosts = listPosts.reverse();
        const albums = userData['albumsData']
        let listAlbums = [];
        if (albums) {
            for (const key in albums) {
                let imgUrls = [];
                albums[key].imgContent.forEach((img)=>{
                    img.Url = http.getHost() + img.Url
                    imgUrls.push(img.Url)
                })
                albums[key].imgContent = imgUrls
                listAlbums.push(albums[key]);
            }
        }
        albumStore.userAlbums = listAlbums.reverse();
    }
}

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
                        userStore.setUserData(userData);
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
    userStore.sendLogoutRequest().then(response => {
        if (response.status === 200) {
            userStore.user.firstName = '';
            userStore.user.lastName = '';
            userStore.user.imgAvatar = '';
            userStore.emit('logouted');
        }
    })
});

Dispatcher.register('send-register-request', (details) => {
    userStore.sendRegisterRequest(details).then(response => {
        if (response.status === 200) {
            userStore.emit('registered', details);
        } else if (response.status === 403) {
            userStore.emit('registration-failed');
        }
    })
});

Dispatcher.register('go-friend-profile', (datails) => {
    userStore.getProfileFriend(datails.id).then((userData) => {
        userStore.setUserData(userData);
        console.log(userData)
        userStore.emit('friend-page-received');
    });
});

Dispatcher.register('get-user-profile', () => {
    userStore.getProfile().then((userData) => {
        userStore.setUserData(userData);
        userStore.emit('authorized');
    });
});

Dispatcher.register('init-user', () => {
    userStore.getProfile().then((userData) => {
        userStore.setUserData(userData);
        userStore.emit('init-user');
    });
});

export default userStore;
