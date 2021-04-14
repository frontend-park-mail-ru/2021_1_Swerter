class Post {
  constructor(arg) {
    this.textPost = arg.textPost;
    this.date = arg.date;
    this.postCreator = arg.postCreator;
    this.imgAvatar = arg.imgAvatar;
  }

  addContent(imgContentUrl) {
    this.imgContent = imgContentUrl;
  }
}
export default Post;
