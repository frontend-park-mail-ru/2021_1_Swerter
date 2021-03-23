import Dispatcher from '../dispatcher.js';

class PostStore {
  constructor() {
    this.posts= [];
    this.listeners= {};
  }

  getAll() {
    return this.posts;
  }

  // fix
  bind(event, callback) {
    this.listeners[event] = callback;
  }

  off(event, callback) { // отписываемся от события
    this.listeners[event] = this.listeners[event]
        .filter(function(listener) {
          return listener !== callback;
        });
  }

  // fix
  emit(event, data) {
    this.listeners[event](data);
  }
}

const postStore = new PostStore();

Dispatcher.register('add-post', (details) => {
  postStore.posts.push(details.newPost);
  console.log(details.newPost);

  profileData.postsData = postStore.getAll();
  console.log(postStore.getAll());
  console.log(profileData);
  postStore.emit('post-added');
});

export default postStore;
