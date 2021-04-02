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

// userData: {
//     myPage: true,
//         imgBg: './assets/imgContent.jpg',
//         modEdited: false,
//         login: 'login',
//         password: 'password',
//         firstName: 'Dima',
//         lastName: 'Akzhigitov',
//         needUpdate: false,
// },