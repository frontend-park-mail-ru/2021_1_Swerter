class Router {
    routes = {};

    register(url, page, listeners = null) {
        this.routes[url] = {
            page,
            listeners
        };

    }

    //TODO: delete state
    go(url, state) {
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
        // console.log(links)
        // window.l = links
    }
}

export let router = new Router();

