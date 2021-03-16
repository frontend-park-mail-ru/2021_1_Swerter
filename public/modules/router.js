class Router {
  register(route) {
    this[route.name] = route;
  }
}

export let router = new Router();

