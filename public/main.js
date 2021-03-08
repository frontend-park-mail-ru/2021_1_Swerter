'use strict'

import {HttpRequest} from './modules/http.js';

window.application = document.getElementById("app");

//Страница ленты
application.innerHTML = newsfeedTemplate(postsData);

//Страница юзера
// application.innerHTML = profileTemplate(postData);

window.http = new HttpRequest('http://localhost:8000');
