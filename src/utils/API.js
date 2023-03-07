const URL_PREFIX="http://localhost:3001"

const API = {
    getAllGroups : ()=>{
        return fetch(`${URL_PREFIX}/api/groups`).then(res=>res.json())
    }

}

export default API