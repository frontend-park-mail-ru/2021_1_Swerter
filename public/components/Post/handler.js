export function addPostListeners() {
    const likes = document.getElementsByClassName('post__footer__column_like')
    for (let like of likes) {
        like.addEventListener('click', ()=>{
            setLike(like);
        });
    }
}

function setLike(like) {
    like.style.color = "red";
}