import { backendUrl } from './constants.js';

export const noop = () => null;

export const uniqueId = () =>  {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const makeAvatarPath = (path) => backendUrl + '/img' + path;

export const urlencodeFormData = (fd) => {
    let s = '';
    const encode = (s) => {
        return encodeURIComponent(s).replace(/%20/g,'+');
    };

    for (const pair of fd.entries()) {
        if (typeof pair[1] == 'string'){
            s += (s?'&':'') + encode(pair[0])+'=' + encode(pair[1]);
        }
    }

    return s;
};
