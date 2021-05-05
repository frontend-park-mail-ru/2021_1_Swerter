import appStateStore from "./Stores/AppStateStore.js";
import userStore from "./Stores/UserStore.js";
import postStore from "./Stores/PostStore.js";
import loginPage from "./view/LoginPage/LoginPage.js";
import registerPage from "./view/RegisterPage/RegisterPage.js";
import profilePage from "./view/ProfilePage/ProfilePage.js";
import newsFeedPage from "./view/NewsFeedPage/NewsFeedPage.js";
// import friendsPage from "./view/FriendsPage/FriendsPage.js";
import {Routes} from "./consts/Routes.js";

userStore.init();
postStore.init();

appStateStore.add(Routes.LOGIN_PAGE, loginPage);
appStateStore.add(Routes.REGISTER_PAGE, registerPage);

appStateStore.add(Routes.DEFAULT_PAGE, profilePage);
appStateStore.add(Routes.PROFILE_PAGE, profilePage);
appStateStore.add(Routes.NEWS_PAGE, newsFeedPage);
// appStateStore.add(Routes.FRIENDS_PAGE, friendsPage);

appStateStore.start();
