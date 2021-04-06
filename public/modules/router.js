class Router {
    routes = {};

    register(url, page, listeners = null) {
        this.routes[url] = {
            page,
            listeners
        };

    }

    go(url) {
        this.routes[url].page()
        this.addEventsForLinks()
    }

    addEventsForLinks() {
        let links = document.getElementsByTagName("a");
        [...links].forEach((a)=>{
            a.addEventListener('click', (e)=>{
                let indexDog = a.href.indexOf("@")
                if (indexDog + 1) {
                    e.preventDefault()
                    this.go(a.href.split("@")[1])
                }
            })
        })
    }
}

export let router = new Router();

