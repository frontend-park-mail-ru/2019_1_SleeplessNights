class IndexedDB {
    constructor () {
        this.DB_NAME = 'quiz-planet';
        this.DB_VERSION = 1;
        this.db = null;

        if (!('indexedDB' in window)) {
            console.log('This browser doesn\'t support IndexedDB');
        } else {
            this.open();
        }
    }

    _ObjectStore(storeName) {
        const tx = this.db.transaction(storeName, 'readwrite');
        return tx.objectStore(storeName);
    }

    add(storeName, data) {
        data.forEach( item => this._ObjectStore(storeName).add(item));
    }

    get(storeName, item) {
        const request = this._ObjectStore(storeName).get(item);
        request.addEventListener('error', err => console.error(err));
        request.addEventListener('success', (data) => bus.emit(`success:get-${storeName}-${item}`, data));
    }

    remove(storeName, item) {
        const request = this._ObjectStore(storeName).delete(item);
        request.addEventListener('error', err => console.error(err));
        request.addEventListener('success', () => {
            console.log(`Successfully deleted ${item} from ${storeName}`);
            // bus.emit(`success:dele-${storeName}-${item}`)
        });
    }

    open() {
        const dbOpenRequest = indexedDB.open(this.DB_NAME, this.DB_VERSION);

        dbOpenRequest.addEventListener('error', event => console.error(event));
        dbOpenRequest.addEventListener('upgradeneeded', event => {
            this.db = event.target.result;
            console.log(`Upgrading to version ${this.db.version}`);

            const user = this.db.createObjectStore('user', { keyPath: 'id', autoIncrement: true });
            user.createIndex('nickname', 'nickname', { unique: false });
            user.createIndex('avatar_path', 'avatar_path', { unique: false });

            const pack = this.db.createObjectStore('pack', { keyPath: 'id', autoIncrement: true });
            pack.createIndex('name', 'name', { unique: false });

            const question = this.db.createObjectStore('question', { keyPath: 'id', autoIncrement: true });
            question.createIndex('answers', 'answers', { unique: false });
            question.createIndex('correct', 'correct', { unique: false });
            question.createIndex('text', 'text', { unique: false });
            question.createIndex('packId', 'packId', { unique: false });
        });
    }
}

export default new IndexedDB();
