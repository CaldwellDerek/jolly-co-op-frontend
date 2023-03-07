const URL_PREFIX="http://localhost:3001"

const API = {

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
    }
}

    getAllGroups : ()=>{
        return fetch(`${URL_PREFIX}/api/groups`).then(res=>res.json())
    }



export default API