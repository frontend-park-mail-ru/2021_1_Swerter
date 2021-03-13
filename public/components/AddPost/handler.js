(function () {

    let newPostPhoto = '';
    let postContentFile = '';

    function addPost() {
        addFrontendPost();
        addBackendPost();
    }

    function addFrontendPost() {
        let u = profileData.userData;
        let currentDate = new Date();
        let datetime = currentDate.getDay() + "." + currentDate.getMonth() + "." + currentDate.getFullYear();
        let newPost = {
            needDownload:false,
            imgAvatar: u.imgAvatar,
            postCreator: u.firstName + " " + u.lastName,
            date: datetime,
            textPost: document.getElementById("text-post").value.replace(/<\/?[^>]+(>|$)/g, "")
        }
        if (newPostPhoto) {
            newPost.imgContent = newPostPhoto;
        }
        profileData.postsData.unshift(newPost);
        router.goProfile({needUpdate:false})
        newPostPhoto = '';
    }

    function addBackendPost() {
        let currentDate = new Date();
        let datetime = currentDate.getDay() + "." + currentDate.getMonth() + "." + currentDate.getFullYear();
        let textPost = document.getElementById("text-post").value.replace(/<\/?[^>]+(>|$)/g, "");
        //Не нужно отправлять инфу о юзере, потому что только авторизированный делает посты. Бек знает пользователя
        let formData = new FormData();
        if (postContentFile) {
            formData.append("imgContent", postContentFile, postContentFile.name);
        }
        formData.append('textPost', textPost);
        formData.append('date', datetime);
        http.post({url: "/posts/add", data: formData, headers: {}});
        postContentFile = '';
    }


    function uploadPostContent() {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            postContentFile = input.files[0];
            newPostPhoto = URL.createObjectURL(postContentFile);
        }
        input.click();
    }


    window.addPost = addPost;
    window.uploadPostContent = uploadPostContent;
})()
