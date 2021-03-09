'use strict'

import {HttpRequest} from './modules/http.js';

window.application = document.getElementById("app");

//Страница логина
application.innerHTML = loginpageTemplate();

//Страница регистрации
// application.innerHTML = registerpageTemplate();

//Страница юзера
// application.innerHTML = profileTemplate(postsData);

//Страница ленты
// application.innerHTML = newsfeedTemplate(postData);

window.http = new HttpRequest('http://localhost:8000');
