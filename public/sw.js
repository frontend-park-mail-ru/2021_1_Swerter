// regexp  '(.*).pug,'
//del all .pug, sw.js

const CACHE = 'vk-cache'
const cacheUrls = [
        'components/SiteDescription',
        'components/SiteDescription/SiteDescription.css',
        'components/ProfileHeader',
        'components/ProfileHeader/handler.js',
        'components/ProfileHeader/ProfileHeader.css',
        'components/ProfileHeader/ProfileHeader.tmpl.js',
        'components/ShowImgModal',
        'components/ShowImgModal/handler.js',
        'components/ShowImgModal/ShowImgModal.css',
        'components/AddAlbum',
        'components/AddAlbum/handler.js',
        'components/AddAlbum/AddAlbum.css',
        'components/FriendBlock',
        'components/FriendBlock/handler.js',
        'components/FriendBlock/FriendBlock.css',
        'components/RegisterForm',
        'components/RegisterForm/handler.js',
        'components/RegisterForm/RegisterForm.css',
        'components/FriendRequestBlock',
        'components/FriendRequestBlock/FriendRequestBlock.css',
        'components/FriendRequestBlock/handler.js',
        'components/AlbumPhotos',
        'components/AlbumPhotos/handler.js',
        'components/AlbumPhotos/AlbumsPhotos.css',
        'components/ConfigModal',
        'components/ConfigModal/handler.js',
        'components/ConfigModal/ConfigModal.css',
        'components/AddPost',
        'components/AddPost/handler.js',
        'components/AddPost/AddPost.css',
        'components/Header',
        'components/Header/handler.js',
        'components/Header/Header.tmpl.js',
        'components/Header/Header.css',
        'components/LoginForm',
        'components/LoginForm/handler.js',
        'components/LoginForm/LoginForm.css',
        'components/PostModal',
        'components/PostModal/handler.js',
        'components/PostModal/PostModal.css',
        'components/AlbumPreview',
        'components/AlbumPreview/handler.js',
        'components/AlbumPreview/AlbumPreview.css',
        'components/Post',
        'components/Post/Post.css',
        'components/Post/handler.js',
        'components/Post/Post.tmpl.js',
        'components/SearchFriend',
        'components/SearchFriend/handler.js',
        'components/SearchFriend/SearchFriend.css',
        'main.css',
        'index.html',
        'main.js',
        'assets',
        'assets/f-14.jpg',
        'assets/reposticon.png',
        'assets/iconCheckMark.png',
        'assets/f-39.jpg',
        'assets/iconAddAlbum.png',
        'assets/comment.png',
        'assets/like.png',
        'assets/heart-broken-solid.png',
        'assets/close.png',
        'assets/imgContent.jpg',
        'assets/iconAdd.png',
        'assets/background.jpg',
        'assets/friendDefault.png',
        'assets/iconFinder.png',
        'assets/imgLogo.jpg',
        'view/BaseView.js',
        'view/Profile',
        'view/Profile/ProfilePage.js',
        'view/Profile/Profile.tmpl.js',
        'view/Profile/Profile.css',
        'view/RegisterPage',
        'view/RegisterPage/RegisterPage.tmpl.js',
        'view/RegisterPage/RegisterPage.js',
        'view/RegisterPage/RegisterPage.css',
        'view/NewsFeed',
        'view/NewsFeed/NewsFeed.css',
        'view/NewsFeed/NewsFeed.tmpl.js',
        'view/NewsFeed/NewsFeedPage.js',
        'view/AlbumPage',
        'view/AlbumPage/AlbumPage.css',
        'view/AlbumPage/AlbumPage.js',
        'view/AlbumPage/AlbumPage.tmpl.js',
        'view/LoginPage',
        'view/LoginPage/LoginPage.js',
        'view/LoginPage/LoginPage.css',
        'view/LoginPage/LoginPage.tmpl.js',
        'view/FriendsPage',
        'view/FriendsPage/FriendsPage.css',
        'view/FriendsPage/FriendsPage.js',
        'view/FriendsPage/FriendsPage.tmpl.js',
        'view/layout.tmpl.js',
        'view/NewAlbumPage',
        'view/NewAlbumPage/NewAlbumPage.css',
        'view/NewAlbumPage/NewAlbumPage.js',
        'view/NewAlbumPage/NewAlbumPage.tmpl.js',
        'Stores/FriendStore.js',
        'Stores/PostStore.js',
        'Stores/AlbumStore.js',
        'Stores/UserStore.js',
        'modules/observable.js',
        'modules/dispatcher.js',
        'modules/http.js',
        'modules/router.js',
]


this.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE)
            .then((cache) => {
                return cache.addAll(cacheUrls);
            })
            .catch((err)=>{
                console.log(err)
            })
    )
})

this.addEventListener('fetch', (event) => {

    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
        return;
    }
    if (navigator.onLine) {
        return fetch(event.request)
    }
    event.respondWith(
        caches
            .match(event.request)
            .then((cachedResp) => {
                if (cachedResp) {
                    return cachedResp
                }
                console.log('fetch try')
                return fetch(event.request)
            })
            .catch((err) => {
                console.log(err)
            })
    )
})