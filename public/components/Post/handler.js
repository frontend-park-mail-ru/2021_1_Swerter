export function addPostListeners() {
    const likes = document.getElementsByClassName('post__footer__column__like')
    for (let like of likes) {
        like.addEventListener('click', ()=>{
            setLike(like);
        });
    }
}

function setLike(like) {
    console.log(like.id)
    like.style.color = "red";
}