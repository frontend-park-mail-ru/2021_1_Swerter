(function() {
  let newPostPhoto = '';
  let postContentFile = '';

  function addPost() {
    textPost = document.getElementById('text-post').value.replace(/<\/?[^>]+(>|$)/g, '');
    addFrontendPost();
    addBackendPost();
  }

  function addFrontendPost() {
    const u = profileData.userData;
    const currentDate = new Date();
    const datetime = currentDate.getDay() + '.' + currentDate.getMonth() + '.' + currentDate.getFullYear();
    const newPost = {
      needDownload: false,
      imgAvatar: u.imgAvatar,
      postCreator: u.firstName + ' ' + u.lastName,
      date: datetime,
      textPost,
    };
    if (newPostPhoto) {
      newPost.imgContent = newPostPhoto;
    }
    profileData.postsData.unshift(newPost);
    router.goProfile({needUpdate: false});
    newPostPhoto = '';
  }

  function addBackendPost() {
    const currentDate = new Date();
    const datetime = currentDate.getDay() + '.' + currentDate.getMonth() + '.' + currentDate.getFullYear();
    const formData = new FormData();
    if (postContentFile) {
      formData.append('imgContent', postContentFile, postContentFile.name);
    }
    console.log(textPost);
    formData.append('textPost', textPost);
    formData.append('date', datetime);
    http.post({url: '/posts/add', data: formData, headers: {}});
    postContentFile = '';
  }


  function uploadPostContent() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      postContentFile = input.files[0];
      newPostPhoto = URL.createObjectURL(postContentFile);
    };
    input.click();
  }


  window.addPost = addPost;
  window.uploadPostContent = uploadPostContent;
})();
