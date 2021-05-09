import '@babel/polyfill';
import './main.css';

import appStateStore from "./Stores/AppStateStore";
import userStore from "./Stores/UserStore";
import postStore from "./Stores/PostStore";
import albumStore from "./Stores/AlbumStore";
import friendStore from "./Stores/FriendStore";

import loginPage from "./view/LoginPage/LoginPage";
import registerPage from "./view/RegisterPage/RegisterPage";
import profilePage from "./view/ProfilePage/ProfilePage";
import newsFeedPage from "./view/NewsFeedPage/NewsFeedPage";
import friendsPage from "./view/FriendsPage/FriendsPage";
import albumPage from "./view/AlbumPage/AlbumPage";
import newAlbumPage from "./view/NewAlbumPage/NewAlbumPage";

import {Routes} from "./consts/Routes";

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