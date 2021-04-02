'use strict';
import {router} from './modules/router.js';
import {http} from './modules/http.js';
import * as header from './components/Header/handler.js';
import * as login from './components/LoginForm/handler.js';
import * as register from './components/RegisterForm/handler.js';
import * as addPost from './components/AddPost/handler.js';
import * as configModal from './components/ConfigModal/handler.js';
import * as modelPost from './models/post.js';
import * as profileHeader from './components/ProfileHeader/handler.js';

import profilePage from "./view/Profile/ProfilePage.js";
import LoginPage from "./view/LoginPage/LoginPage.js";
import RegisterPage from "./view/RegisterPage/RegisterPage.js";
import NewsFeedPage from "./view/NewsFeed/NewsFeedPage.js";

window.application = document.getElementById('app');

const loginPage = new LoginPage();
const registerPage = new RegisterPage();
const newsFeedPage = new NewsFeedPage();

registerUrls()

const user = await http.get({url: '/profile'});
console.log(user.status)
console.log('alal')
switch (user.status) {
    case 200:
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
