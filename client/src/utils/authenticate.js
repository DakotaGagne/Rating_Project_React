import Cookies from 'js-cookie';
export default function authenticate(setUser=null){
    const localUserJWT = Cookies.get('localUserJWT');
    return fetch('http://localhost:3000/auth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Authorization': localUserJWT?`Bearer ${localUserJWT}`:undefined
        }
    })
    .then(res => {
        if(res.status===200)return res.json();
        throw new Error("User not authenticated with Oauth");
    })
    .then(data => {
        // console.log("User Authenticated with: ", data.type)
        if(setUser!=null)setUser(data.type);
        return data;
    })
    .catch(err => {
        console.log(err);
        if(setUser!=null)setUser(false);
        return null;
    });
}