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

import {addLoginPageListeners} from "./view/LoginPage/listeners.js";
import {addNewsPageListeners} from "./view/NewsFeed/listeners.js";
import {addRegisterPageListeners} from "./view/RegisterPage/listeners.js";

import Profile from "./view/Profile/profile.js";

window.application = document.getElementById('app');

const p = new Profile()

registerUrls()

//TODO подумать что делать с состоянием компонента, где его хранить

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
    router.register('/login', loginpageTemplate, addLoginPageListeners)
    router.register('/register', registerpageTemplate, addRegisterPageListeners)
    router.register('/profile', p.render.bind(p))
    router.register('/profile/2', profileTemplate)
    router.register('/news', newsfeedTemplate, addNewsPageListeners)
}
