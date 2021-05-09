const UserStoreEvents = {
    STORE_CHANGED: 'changed',
    PROFILE_REQUEST_SUCCESS:'profile-request-success',
    PROFILE_REQUEST_FAILED: 'profile-request-failed',
    LOGIN_SUCCESS: 'login-success',
    LOGIN_FAILED: 'login-failed',
    REGISTER_SUCCESS: 'register-success',
    REGISTER_FAILED: 'register-failed',
    LOGOUT_SUCCESS: 'logout-success',
    PROFILE_UPDATE_SUCCESS: 'profile-update-success',
    PROFILE_UPDATE_FAILED: 'profile-update-failed'
};

const AppStateStoreEvents = {
    ROUTE_CHANGED: 'route-changed'
};

const PostStoreEvents = {
    POST_ADD_SUCCESS: 'post-add-success',
    POST_ADD_FAILED: 'post-add-failed',
    POSTS_REQUEST_SUCCESS: 'post-request-success',
    POSTS_REQUEST_FAILED: 'post-request-failed',
    POST_LIKE_SUCCESS: 'post-like-success'
};

const FriendStoreEvents = {
    SEARCH_FRIEND_REQUEST_SUCCESS: 'search-friend-request-success',
    SEARCH_FRIEND_REQUEST_FAILED: 'search-friend-request-failed',
    ADD_FRIEND_REQUEST_SUCCESS: 'add-friend-request-success',
    ADD_FRIEND_REQUEST_FAILED: 'add-friend-request-failed',
    REMOVE_FRIEND_REQUEST_SUCCESS: 'remove-friend-request-success',
    REMOVE_FRIEND_REQUEST_FAILED: 'remove-friend-request-failed'
};

const AlbumStoreEvents = {
    USER_ALBUMS_REQUEST_SUCCESS: 'user-albums-request-success',
    ALBUM_ADD_SUCCESS: 'album-add-success',
    ALBUM_REQUEST_SUCCESS: 'album-request-success'
};

export {UserStoreEvents, AppStateStoreEvents, PostStoreEvents, FriendStoreEvents, AlbumStoreEvents};