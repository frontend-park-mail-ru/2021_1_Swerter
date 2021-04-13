import Dispatcher from "../../dispatcher.js";
import postStore from "../../Stores/PostStore.js";
import profilePage from "../../view/Profile/ProfilePage.js";
import newsFeedPage from "../../view/NewsFeed/NewsFeedPage.js";

postStore.bind('like-changed', () => {
    profilePage.emit('like-changed')
    newsFeedPage.emit('new-news-getted')
})

export function addPostListeners() {
    const likes = document.getElementsByClassName('post__footer__column__like')
    for (let like of likes) {
        like.addEventListener('click', () => {
            changeLike(like);
        });
    }
}

function changeLike(like) {
    const postId = like.id.split("like")[1]
    console.log(like.classList)
    Dispatcher.dispatch("like-change", {
        postId,
    })
}

// const classActiveLike = 'post__footer__column__like_active'
// const classDeactiveLike = 'post__footer__column__like_deactive'
