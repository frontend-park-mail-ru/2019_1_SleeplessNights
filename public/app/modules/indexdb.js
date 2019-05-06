import bus from './bus.js';

class IndexedDB {
    constructor () {
        this.DB_NAME = 'quiz-planet';
        this.DB_VERSION = 2;
        this.db = null;

        if (!('indexedDB' in window)) {
            console.log('This browser doesn\'t support IndexedDB');
        } else {
            this.createDB();
        }
    }

    add(storeName, data) {
        this.open((event) => {
            this.db = event.target.result;
            const tx = this.db.transaction(storeName, 'readwrite').objectStore(storeName);
            data.forEach( item => tx.add(item));
        });
    }

    getAll(storeName, key, item, count) {
        this.open((event) => {
            this.db = event.target.result;
            const tx = this.db.transaction(storeName, 'readonly').objectStore(storeName);

            let index = tx;
            if (key) index = tx.index(key);

            index.getAll(item, count).onsuccess = (event) => {
                bus.emit(`success:get-${storeName}-${key ? key: 'id'}-${item ? item: ''}`, event.target.result);
            };
        });
    }

    get(storeName, item) {
        this.open((event) => {
            this.db = event.target.result;
            const tx = this.db.transaction(storeName, 'readonly').objectStore(storeName);

            tx.get(item).onsuccess = (event) => {
                bus.emit(`success:get-${storeName}-${item}`, event.target.result);
            };
        });
    }

    remove(storeName, item) {
        this.open((event) => {
            this.db = event.target.result;
            const tx = this.db.transaction(storeName, 'readonly').objectStore(storeName);
            tx.delete(item).onsuccess = () => {
                console.log(`Successfully deleted ${item} from ${storeName}`);
                // bus.emit(`success:delete-${storeName}-${item}`)
            };
        });
    }

    open(callback) {
        const dbOpenRequest = indexedDB.open(this.DB_NAME, this.DB_VERSION);

        dbOpenRequest.addEventListener('error', event => console.error(event));
        dbOpenRequest.addEventListener('success', callback);
    }

    createDB() {
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
