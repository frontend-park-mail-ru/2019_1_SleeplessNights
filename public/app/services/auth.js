export class AuthService {
    static auth(data) {
        return ajax.post({
            url: '/api/session',
            body: data
        });
    }
}
