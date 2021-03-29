import Dispatcher from '../dispatcher.js';

class PostStore {
  constructor() {
    this.posts= [];
    this.listeners= {};
  }

  getAll() {
    return this.posts;
  }

  bind(event, callback) {
    if (this.listeners[event] === undefined) {
      this.listeners[event] = [callback];
      return;
    }
    this.listeners[event].append(callback);
  }

  off(event, callback) { // отписываемся от события
    this.listeners[event] = this.listeners[event]
        .filter(function(listener) {
          return listener !== callback;
        });
  }

  emit(event, data) {
    this.listeners[event].forEach((listener)=>{
      listener(data);
    });
  }
}

const postStore = new PostStore();

Dispatcher.register('add-post', (details) => {
  postStore.posts.push(details.newPost);
  profileData.postsData = postStore.getAll();
  postStore.emit('post-added');
});

export default postStore;
