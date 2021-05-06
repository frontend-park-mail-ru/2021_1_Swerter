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

export {UserStoreEvents, AppStateStoreEvents, PostStoreEvents};