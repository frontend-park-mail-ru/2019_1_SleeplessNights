export class AjaxModule {
    static _fetch({
        url = '/',
        method = 'GET',
        body = null,
        headers = [[ 'Content-Type', 'application/json;charset=UTF-8' ]],
    } = {}) {
        return fetch(url, {
            method, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            credentials: 'include',
            headers: new Headers(headers), // "Content-Type": "application/x-www-form-urlencoded",
            body, // body data type must match "Content-Type" header
        })
        .then(response => response.json()); // parses response to JSON
    }

    static post({
        url,
        body,
        headers = [[ 'Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8' ]]
    } = {}) {
        return this._fetch({
            url,
            method: 'POST',
            body,
            headers
        });
    }

    static patch({
         url,
         body,
         headers = []
    } = {}) {
        return this._fetch({
            url,
            method: 'PATCH',
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

    static delete({ url, headers } = {}) {
        return this._fetch({
            url,
            method: 'DELETE',
            headers
        });
    }
}
