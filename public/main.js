import {router} from './modules/router.js';
import {http} from './modules/http.js';

import profilePage from "./view/Profile/ProfilePage.js";
import loginPage from "./view/LoginPage/LoginPage.js";
import newsFeedPage from "./view/NewsFeed/NewsFeedPage.js";
import registerPage from "./view/RegisterPage/RegisterPage.js";
import friendPage from "./view/FriendsPage/FriendsPage.js";
import Dispatcher from "./dispatcher.js"
import postStore from "./Stores/PostStore.js";
import userStore from "./Stores/UserStore.js";
import friendStore from "./Stores/FriendStore.js";
import albumStore from "./Stores/AlbumStore.js";

window.application = document.getElementById('app');


registerUrls()

window.addEventListener('load', () => {
    console.log('loaded')
    let location = window.location.hash.split('#')[1]
    const user = http.get({url: '/profile'});
    user.then((response) => {
        switch (response.status) {
            case 200:
                Dispatcher.dispatch('init-user')
                postStore.emit('authorized')
                profilePage.bind('user-inited', () => {
                    if (!location) {
                        router.go('/profile')
                        return
                    }
                    switch (location) {
                        case '/profile':
                            Dispatcher.dispatch('get-user-profile', {});
                            break;
                            //Проброс авторизованных
                        case '/login':
                            Dispatcher.dispatch('get-user-profile', {});
                            break;
                        case '/register':
                            Dispatcher.dispatch('get-user-profile', {});
                            break;

                        case '/friends':
                            Dispatcher.dispatch('go-friends-page', {});
                            break
                        case '/news':
                            postStore.bind('init-news', () => {
                                router.go('/news')
                            })
                            break
                    }
                })
                break
            case 401:
                router.go('/login')
                break
        }
    })
})


function registerUrls() {
    router.register('/login', loginPage.render.bind(loginPage))
    router.register('/register', registerPage.render.bind(registerPage))
    router.register('/profile', profilePage.render.bind(profilePage))
    router.register('/friends', friendPage.render.bind(friendPage))
    router.register('/news', newsFeedPage.render.bind(newsFeedPage))
}
