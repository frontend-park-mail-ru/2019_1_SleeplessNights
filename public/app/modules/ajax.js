import { backendUrl } from './constants.js';

export class AjaxModule {
    static _fetch({
        url = '/',
        method = 'GET',
        body = null,
        headers = [[ 'Content-Type', 'application/json;charset=UTF-8' ]],
    } = {}) {

        if (url.indexOf('api') !== -1) {
            url = backendUrl + url;
        }

        return fetch(url, {
            method, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            credentials: 'include',
            headers: new Headers(headers), // "Content-Type": "application/x-www-form-urlencoded",
            body, // body data type must match "Content-Type" header
        })
        .then(response => {
            return new Promise((resolve, reject) => {
                if (response.status === 200) {
                    response.json().then(data => resolve(data));
                } else {
                    response.json().then(data => reject({'status': response.status, 'data': data}));
                }
            });
        });
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
