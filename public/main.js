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

import {addProfileListeners} from "./view/Profile/listeners.js";



window.application = document.getElementById('app');

router.register('/login', loginpageTemplate,)
router.register('/register', registerpageTemplate)
router.register('/profile', profileTemplate, addProfileListeners)
router.register('/profile/2', profileTemplate)
router.register('/news', newsfeedTemplate)


router.go('/profile', profileData)
