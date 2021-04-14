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

    const postImgs = document.querySelectorAll('[id^="post-img-"]')
    postImgs.forEach((item)=> {
        item.addEventListener('click', () => {
            const chanks = item.id.split('-')
            let imgId = chanks[chanks.length - 2]
            let postId = chanks[chanks.length - 1]
            profilePage.emit('show-post-img', {postId, imgId})
        });
    });
}

function changeLike(like) {
    const postId = like.id.split("like")[1]
    console.log(like.classList)
    Dispatcher.dispatch("like-change", {
        postId,
    })
}

