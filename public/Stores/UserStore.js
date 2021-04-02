import Dispatcher from '../dispatcher.js';
import {http} from '../modules/http.js';
import makeObservable from '../observable.js';
import user from "../models/user.js";

class UserStore {
    constructor() {
        this.user = user;
    }

    async getAva() {
        const userData = await http.get({url: '/profile'});
        let imgAvatar = http.getHost() + '/static/usersAvatar/';
        imgAvatar += userData.body['avatar'] ? userData.body['avatar'] : 'defaultUser.jpg';
        return imgAvatar;
    }

    uploadAva(imgInfo) {
        const formData = new FormData();
        const imgContent = imgInfo.imgAvaFile;
        formData.append('avatar', imgContent);
        const response = http.post({url: '/profile/loadImg', data: formData, headers: {}});
    }
}

makeObservable(UserStore);
const userStore = new UserStore();

Dispatcher.register('upload-ava', (details) => {
    userStore.uploadAva(details.imgInfo)
    userStore.emit('ava-uploaded')
});

export default userStore;
