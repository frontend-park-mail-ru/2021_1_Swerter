import {addHeaderListeners} from "../../components/Header/handler.js";
import makeObservable from "../../observable.js";
import {router} from "../../modules/router.js";
import profilePage from '../Profile/ProfilePage.js'
import albumStore from '../../Stores/AlbumStore.js';


export function addAlbumPageListeners() {
  addHeaderListeners();
}

class AlbumPage {
  state = {
      album:{}
  }

  constructor() {
    this.registerEvents();
  }

  render() {
    window.application.innerHTML = albumpageTemplate(this.state);
    this.addListeners();
  }

  setInfo() {
    this.state.album = albumStore.currentAlbum;
    console.log(this.state.album)
    //костыль хедера
    this.state.userData = profilePage.state.userData
    this.state.viewState = profilePage.state.viewState
  }


  addListeners() {
    addHeaderListeners();

  }

  registerEvents() {
    this.bind('album-received', () => {
      this.setInfo();
      this.render();
      router.addEventsForLinks();
    })
  }
}

makeObservable(AlbumPage)
const albumPage = new AlbumPage();

export default albumPage
