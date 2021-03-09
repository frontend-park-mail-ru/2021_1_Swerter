'use strict'

import {HttpRequest} from './modules/http.js';

window.application = document.getElementById("app");

//Страница ленты
// application.innerHTML = newsfeedTemplate(postsData);

//Страница юзера
// application.innerHTML = profileTemplate(postsData);

//Страница логина
// application.innerHTML = loginpageTemplate();

//Страница регистрации
// application.innerHTML = registerpageTemplate();

window.http = new HttpRequest('http://localhost:8000');

window.http.get({url: "/posts"})
    .then((response) => {
        console.log(response)
    })
    .catch(() => console.log("fail"))