export class ScoreboardService {
    static getLeaders(page) {
        return ajax.get({
            url: `/api/leader?page=${page}`
        });
    }
}
