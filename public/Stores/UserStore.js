import Dispatcher from '../dispatcher.js';
// import Post from '../models/post.js';
import {http} from '../modules/http.js';
import makeObservable from '../observable.js';

class UserStore {
  constructor() {
    this.contentPost = [];
    this.posts= [];
  }
}

Dispatcher.register('add-content-post', (details) => {
});

makeObservable(UserStore);
const userStore = new UserStore();

export default userStore;
