export class AjaxModule {
    constructor(){
    }

    static _fetch({
        url = '/',
        method = 'GET',
        body = null,
        headers = { 'Content-Type': 'application/json' },
    } = {}) {
        return fetch(url, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            credentials: 'include',
            headers: headers, // "Content-Type": "application/x-www-form-urlencoded",
            body: body, // body data type must match "Content-Type" header
        })
        .then(response => response.json()); // parses response to JSON
    }

    static post({ url, body, headers } = {}) {
        return this._fetch({
            url,
            method: 'POST',
            body,
            headers
        });
    }

    static get({ url, headers } = {}) {
        return this._fetch({
            url,
            method: 'GET',
            headers
        });
    }
}
