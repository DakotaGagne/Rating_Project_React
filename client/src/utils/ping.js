const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ping() {
    console.log('ping function called');
    return fetch(`${SERVER_URL}/ping`)
        .then(res => {
        if (res.ok) {
            return res;
        } else {
            throw new Error('Server is not responding');
        }
        })
        .catch(err => {
            console.error(err);
            return null;
        });
}