export class Cookie {
    static add (name, value, exHours) {
        const exSeconds = exHours * 60 * 60;
        document.cookie = `${name}=${value}; max-age=${exSeconds};`;
    }
    
    static read (cname) {
        const name = cname + '=';
        const ca = document.cookie.split(';');
        let res = null;

        ca.forEach(c => {
            while (c.charAt(0) === ' ')
                c = c.substring(1);
            if (c.includes(name)) {
                res = c.substring(name.length, c.length);
            }
        });

        return res;
    }
    
    static erase (name) {
        document.cookie = `${name}=; Max-Age=-99999999;`;
    }
}
