(function () {

    class HttpRequest {
        constructor(host = '') {
            this.host = host;
        }

        async get(params = {url: ''}) {
            return await this.#fetchSafe(params);
        }

        async post(params = {
            url: '', data: {}, headers: {
                'Content-Type': 'application/json'
            }
        }) {
            return await this.#fetchUnsafe(params);
        }

        async put(params = {url: '', data: {}}) {
            return await this.#fetchUnsafe({...params, method: 'PUT'})
        }

        async delete(params = {url: ''}) {
            return await this.#fetchUnsafe({...params, method: 'DELETE'})
        }

        async #fetchSafe({url = '', method = 'GET'}) {
            const response = await fetch(this.host + url, {
                method: method,
                mode: 'cors',
                credentials: 'include'
            });
            console.log(response)

            let parsedResponse = {status: response.status};
            let parsedBody = null;

            try {
                parsedBody = await response.json();
            } catch (error) {
                parsedBody = {"error": error};
            }

            parsedResponse.body = parsedBody;

            return parsedResponse;
        }

        async #fetchUnsafe({url = '', data = JSON.stringify({}), headers = {}, method = 'POST'}) {
            const response = await fetch(this.host + url, {
                method: method,
                mode: 'cors',
                credentials: 'include',
                headers: headers,
                body: data
            });
            console.log(response);

            let parsedResponse = {status: response.status};
            let parsedBody = null;

            try {
                parsedBody = await response.json();
            } catch (error) {
                parsedBody = {"error": error};
            }

            parsedResponse.body = parsedBody;

            return parsedResponse;
        }

    }

    window.http = new HttpRequest('http://localhost:8000');
})()