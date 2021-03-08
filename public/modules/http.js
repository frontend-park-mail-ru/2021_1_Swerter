class HttpRequest {
    constructor(host = '') {
        this.host = host;
    }

    async get(params = { url: '' }) {
        return await this.#fetchSafe(params);
    }

    async post(params = { url: '', data: {} }) {
        return await this.#fetchUnsafe(params);
    }

    async put(params = { url: '', data: {} }) {
        return await this.#fetchUnsafe({ ...params, method: 'PUT' })
    }

    async delete(params = { url: '' }) {
        return await this.#fetchUnsafe({ ...params, method: 'DELETE' })
    }

    async #fetchSafe({ url = '', method = 'GET' }) {
        const response = await fetch(this.host + url, {
            method: method,
            mode: 'cors',
            credentials: 'include'
        });

        if (response.body !== null) {
            return response.json();
        }
    }

    async #fetchUnsafe({ url = '', data = {}, method = 'POST' }) {
        const response = await fetch(this.host + url, {
            method: method,
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.body !== null) {
            return response.json();
        }
    }

}

export { HttpRequest };