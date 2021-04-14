class Router {
    routes = {};

    register(url, page, listeners = null) {
        this.routes[url] = {
            page,
            listeners
        };

    }

    go(url) {
        window.location.hash = url
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
                    const page = a.href.split("@")[1]
                    this.go(page)
                }
            })
        })
    }
}

export let router = new Router();

