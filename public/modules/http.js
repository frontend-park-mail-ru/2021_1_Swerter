class HttpRequest {
    STATUS = {
        OK: 200,
        CREATED: 201,
        UNAUTHORIZED: 401,
        Forbidden: 403
    }

    constructor(host = '') {
        this.host = host;
    }

    getHost() {
        return this.host;
    }

    async get(params = {url: ''}) {
        return await this._fetchSafe(params);
    }

    async post(params = {
        url: '', data: {}, headers: {},
    }) {
        return await this._fetchUnsafe(params);
    }

    async put(params = {url: '', data: {}}) {
        return await this._fetchUnsafe({...params, method: 'PUT'});
    }

    async delete(params = {url: ''}) {
        return await this._fetchUnsafe({...params, method: 'DELETE'});
    }

    async _fetchSafe({url = '', method = 'GET'}) {
        const response = await fetch(this.host + url, {
            method: method,
            mode: 'cors',
            credentials: 'include',
        });

        let parsedResponse = {status: response.status};
        let parsedBody = null;

        try {
            parsedBody = await response.json();
        } catch (error) {
            parsedBody = {'error': error};
        }

        parsedResponse.body = parsedBody;

        return parsedResponse;
    }

    async _fetchUnsafe({
                           url = '', data = JSON.stringify({}), headers = {
            'Content-Type': 'application/json',
        }, method = 'POST',
                       }) {
        const response = await fetch(this.host + url, {
            method: method,
            mode: 'cors',
            credentials: 'include',
            headers: headers,
            body: data,
        });

        let parsedResponse = {status: response.status};
        let parsedBody = null;

        try {
            parsedBody = await response.json();
        } catch (error) {
            parsedBody = {'error': error};
        }

        parsedResponse.body = parsedBody;

        return parsedResponse;
    }

}

export const http = new HttpRequest('http://localhost:8000');
