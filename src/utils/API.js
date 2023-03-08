const URL_PREFIX="http://localhost:3001"

const API = {

getUserData:id=>{
    return fetch(`${URL_PREFIX}/api/users/${id}`).then(res=>res.json())
},
isValidToken:token=>{
    return fetch(`${URL_PREFIX}/api/users/isValidToken`, {
        headers:{
            "authorization":`Bearer ${token}`
        }
    }).then(res=>res.json())
},

    login:userObj=>{
        return fetch(`${URL_PREFIX}/api/users/login`,{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }        
    }).then(res=>res.json())
    },
    signup:userObj=>{
        return fetch(`${URL_PREFIX}/api/users/signup`, {
            method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }        
        }).then(res=>res.json())
    },
    saveGame: gameObj=> {
        return fetch(`${URL_PREFIX}/api/games`, {
            method:"PUT",
            body: JSON.stringify(gameObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    }
}

export default API