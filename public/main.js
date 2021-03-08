'use strict'

import {HttpRequest} from './modules/http.js';

const application = document.getElementById("app");

//Страница ленты
application.innerHTML = newsFeed(postsData);

//Страница юзера
// application.innerHTML = profile(postData);

window.http = new HttpRequest('http://localhost:8000');
