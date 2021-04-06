import {router} from './modules/router.js';
import {http} from './modules/http.js';

import profilePage from "./view/Profile/ProfilePage.js";
import loginPage from "./view/LoginPage/LoginPage.js";
import newsFeedPage from "./view/NewsFeed/NewsFeedPage.js";
import registerPage from "./view/RegisterPage/RegisterPage.js";
import Dispatcher from "./dispatcher.js"
import postStore from "./Stores/PostStore.js";

window.application = document.getElementById('app');


registerUrls()

const user = await http.get({url: '/profile'});
console.log(user.status)
console.log('alal')
switch (user.status) {
    case 200:
        Dispatcher.dispatch('get-user-profile', {});
        postStore.emit('authorized')
        router.go('/profile')
        break
    case 401:
        router.go('/login')
        break
}


function registerUrls() {
    router.register('/login', loginPage.render.bind(loginPage))
    router.register('/register', registerPage.render.bind(registerPage))
    router.register('/profile', profilePage.render.bind(profilePage))
    router.register('/profile/2', profilePage.render.bind(profilePage))
    router.register('/news', newsFeedPage.render.bind(newsFeedPage))
}
