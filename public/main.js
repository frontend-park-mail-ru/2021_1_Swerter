'use strict'

import {HttpRequest} from './modules/http.js';

window.application = document.getElementById("app");

//Страница ленты
// application.innerHTML = newsfeedTemplate(postsData);

//Страница юзера
// application.innerHTML = profileTemplate(postData);

//Страница логина и регистрации
application.innerHTML = loginregisterTemplate();

window.http = new HttpRequest('http://localhost:8000');
