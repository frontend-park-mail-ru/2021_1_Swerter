(function () {
    class Router {
        register(route) {
            this[route.name] = route
        }
    }

    window.router = new Router();
})()