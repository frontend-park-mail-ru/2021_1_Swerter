class User {
    constructor() {

    }

    setAva(url) {
        this.imgAvatar = url
    }

    getAva() {
        return this.imgAvatar
    }
}

let user = new User();
export default user;
