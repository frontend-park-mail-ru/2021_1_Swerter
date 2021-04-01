class Router {
    routes = {};

    register(url, page, listeners = null) {
        this.routes[url] = {
            page,
            listeners
        };

    }

    go(url, state) {
        window.application.innerHTML = this.routes[url].page(state)
        this.routes[url].listeners()
    }
}

export let router = new Router();

