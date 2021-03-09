(function () {

    let newPostPhoto = '';

    function addPost() {
        let u = profileData.userData;
        let currentDate = new Date();
        let datetime = currentDate.getDay() + "." + currentDate.getMonth() + "." + currentDate.getFullYear()
        let newPost = {
            imgAvatar: u.imgAvatar,
            imgContent: newPostPhoto,
            postCreator: u.firstName + " " + u.lastName,
            date: datetime,
            textPost: document.getElementById("text-post").value.replace(/<\/?[^>]+(>|$)/g, "")
        }
        profileData.postsData.unshift(newPost);
        newPostPhoto = ''
        router.goProfile()

    }

    function uploadPostContent() {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            newPostPhoto = URL.createObjectURL(input.files[0]);
        }
        input.click();
    }

    window.addPost = addPost;
    window.uploadPostContent = uploadPostContent;
})()
