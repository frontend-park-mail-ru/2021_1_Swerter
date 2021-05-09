import appStateStore from "./Stores/AppStateStore.js";
import userStore from "./Stores/UserStore.js";
import postStore from "./Stores/PostStore.js";
import albumStore from "./Stores/AlbumStore.js";

import loginPage from "./view/LoginPage/LoginPage.js";

import registerPage from "./view/RegisterPage/RegisterPage.js";
import profilePage from "./view/ProfilePage/ProfilePage.js";
import newsFeedPage from "./view/NewsFeedPage/NewsFeedPage.js";
import friendsPage from "./view/FriendsPage/FriendsPage.js";
import albumPage from "./view/AlbumPage/AlbumPage.js";

import newAlbumPage from "./view/NewAlbumPage/NewAlbumPage.js";
import {Routes} from "./consts/Routes.js";
import friendStore from "./Stores/FriendStore.js";

const initStores = async () => {
    userStore.init();
    postStore.init();
    friendStore.init();
    albumStore.init();
};

appStateStore.register(Routes.LOGIN_PAGE, loginPage);
appStateStore.register(Routes.REGISTER_PAGE, registerPage);

appStateStore.register(Routes.DEFAULT_PAGE, profilePage);
appStateStore.register(Routes.PROFILE_PAGE, profilePage);
appStateStore.register(Routes.NEWS_PAGE, newsFeedPage);
appStateStore.register(Routes.FRIENDS_PAGE, friendsPage);

appStateStore.register(Routes.NEW_ALBUM_PAGE, newAlbumPage);
appStateStore.register(Routes.ALBUM_PAGE, albumPage);

initStores().then(() => appStateStore.start());