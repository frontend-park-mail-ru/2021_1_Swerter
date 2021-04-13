import {addHeaderListeners} from "../../components/Header/handler.js";
import makeObservable from "../../observable.js";
import {router} from "../../modules/router.js";
import profilePage from '../Profile/ProfilePage.js'
import {addAlbumListeners} from "../../components/AddAlbum/handler.js"
import albumStore from '../../Stores/AlbumStore.js';


export function addNewAlbumPageListeners() {
  addHeaderListeners();
  addAlbumListeners();
}

class AddNewAlbumPage {
  state = {
    photos: [],
    userData : {},
    viewState : {}
  }

  constructor() {
    this.registerEvents();
  }

  render() {
    window.application.innerHTML = newalbumpageTemplate(this.state);
    this.addListeners();
  }

  setNewPhoto() {
    this.state.photos = albumStore.getUrlsContent()
  }

  setAlbumInfo() {
    //костыль хедера
    this.state.userData = profilePage.state.userData
    this.state.viewState = profilePage.state.viewState
  }

  addListeners() {
    addHeaderListeners();
    addAlbumListeners();
  }

  registerEvents() {
    this.bind('go-new-album-page', () => {
      this.setAlbumInfo()
      this.render();
      router.addEventsForLinks();
    })

    this.bind('album-content-loaded', () => {
      this.setNewPhoto();
      this.render();
      router.addEventsForLinks();
    })
  }
}

makeObservable(AddNewAlbumPage);
const newAlbumPage = new AddNewAlbumPage();

export default newAlbumPage
