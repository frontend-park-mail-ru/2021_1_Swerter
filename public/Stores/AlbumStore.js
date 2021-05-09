import dispatcher from "../modules/dispatcher.js";
import {http} from "../modules/http.js";
import {UserActions} from "../actions/UserActions.js";
import {AlbumStoreEvents} from "../consts/events.js";
import makeObservable from "../modules/observable.js";

class AlbumStore {
    constructor() {
        this.state = {
            albums: [],
            currentAlbum: []
        };

        this.dispatchToken = dispatcher.register(this.actionsHandler.bind(this));
    }

    init() {
        this.handleUserAlbumsRequest();
    }

    getState() {
        return this.state;
    }

    setState(updater) {
        Object.assign(this.state, updater);

        this.emit('changed', updater);
    }

    actionsHandler(action) {
        switch (action.type) {
            case UserActions.NEW_ALBUM:
                this.handleNewAlbumAction(action.data);
                break;

            case UserActions.ALBUM_REQUEST:
                this.handleAlbumRequestAction(action.data);
                break;

            default:
                return;
        }
    }

    handleUserAlbumsRequest() {
        this.sendUserAlbumsRequest()
            .then(userData => {
                const albums = userData.body['albumsData'];
                let listAlbums = [];
                for (const key in albums) {
                    let imgUrls = [];
                    albums[key].imgContent.forEach((img) => {
                        img.Url = http.getHost() + img.Url
                        imgUrls.push(img.Url)
                    })
                    albums[key].imgContent = imgUrls
                    listAlbums.push(albums[key]);
                }

                this.setState({albums: listAlbums.reverse()});
                this.emit(AlbumStoreEvents.USER_ALBUMS_REQUEST_SUCCESS);
            });
    }

    handleNewAlbumAction(data) {
        const formData = new FormData();
        data.attachments.forEach((file, i) => {
            formData.append(`imgContent${i}`, file, file.name);
        });
        formData.append('albumTitle', data.albumTitle);
        formData.append('albumDescription', data.albumDescription);
        this.sendNewAlbumRequest(formData)
            .then(() => {
                this.emit(AlbumStoreEvents.ALBUM_ADD_SUCCESS);
            });
    }

    handleAlbumRequestAction({id}) {
        this.sendAlbumRequest(id)
            .then(res => {
                const album = res.body;
                let imgUrls = []
                album.imgContent.forEach((img) => {
                    img.Url = http.getHost() + img.Url;
                    imgUrls.push(img.Url);
                });
                album.imgContent = imgUrls;
                this.setState({currentAlbum: album});
                this.emit(AlbumStoreEvents.ALBUM_REQUEST_SUCCESS, {id});
            });
    }

    async sendUserAlbumsRequest() {
        return await http.get({url: '/profile'});
    }

    async sendNewAlbumRequest(data) {
        return await http.post({url: '/album/add', data, headers: {}});
    }

    async sendAlbumRequest(id) {
        return await http.get({url: `/album?id=${id}`});
    }

    postsObjToList(posts) {
        const listPosts = [];
        for (const key in posts) {
            posts[key].imgContent = posts[key].imgContent ? http.getHost() + posts[key].imgContent : '';
            listPosts.push(posts[key]);
        }
        return listPosts.reverse();
    }
}

makeObservable(AlbumStore);

const albumStore = new AlbumStore();

export default albumStore;
