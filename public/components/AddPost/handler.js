import {router} from '../../modules/router.js';
import {http} from '../../modules/http.js';

let newPostPhoto = '';
let postContentFile = '';
let textPost;

function addCreatePostListeners() {
  document.getElementById('add-post').addEventListener('click', addPost);
  document.getElementById('upload-post-content').addEventListener('click', uploadPostContent);
}

function addPost() {
  textPost = document.getElementById('text-post').value.replace(/<\/?[^>]+(>|$)/g, '');
  addFrontendPost();
  addBackendPost();
}

function uploadPostContent() {
  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = (e) => {
    postContentFile = input.files[0];
    addImgName(postContentFile.name);
    newPostPhoto = URL.createObjectURL(postContentFile);
  };
  input.click();
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
  formData.append('textPost', textPost);
  formData.append('date', datetime);
  http.post({url: '/posts/add', data: formData, headers: {}});
  postContentFile = '';
}

//Новая функция
function addImgName(fileName) {
  const imgPostName = document.getElementById('uploaded-post-img');
  imgPostName.innerText = fileName.slice(0, 15) + '...';
}

export {addCreatePostListeners};

