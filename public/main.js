'use strict'

window.application = document.getElementById("app");


//Страница логина
application.innerHTML = loginpageTemplate();

//Страница регистрации
// application.innerHTML = registerpageTemplate();

//Страница юзера
// application.innerHTML = profileTemplate(postsData);

//Страница ленты

// application.innerHTML = newsfeedTemplate(postsData);

window.http = new HttpRequest('http://localhost:8000');

