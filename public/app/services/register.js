export class RegisterService {
    static register(data) {
        return ajax.post({
            url: '/api/user',
            body: data
        });
    }
}
