export class ProfileService {
    static getProfile() {
        return ajax.get({
            url: '/api/profile'
        });
    }

    static updateProfile(data) {
        return ajax.patch({
            url: '/api/profile',
            body: data
        });
    }
}
