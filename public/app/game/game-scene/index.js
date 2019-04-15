export class GameScene {
    constructor(root) {
        this.root = root;
        this.avatarMe = null;
        this.avatarOponent = null;

        bus.on('loaded-users', this.updatePlayers);
    }

    updatePlayers = ({me, opponent}) => {
        this.avatarMe.src = me.avatar_path;
        this.avatarOponent.src = opponent.avatar_path;
    };

    destroy() {
        bus.off('loaded-users', this.updatePlayers);
    }
}
