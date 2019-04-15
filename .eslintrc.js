module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Handlebars": true,
        "bus": true,
        "router": true,
        "idb": true,
        "user": true,
        "ajax": true
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "parser": "babel-eslint",
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["warn", "single"],
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "no-console": "off"
    }
};
