const URL_PREFIX = "http://localhost:3001";

const API = {
    getUserData: (id, token) => {
        return fetch(`${URL_PREFIX}/api/users/${id}`, {
            headers: {
            authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json());
    },
    isValidToken: (token) => {
        return fetch(`${URL_PREFIX}/api/users/isValidToken`, {
            headers: {
            authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json());
    },
    getAllUsers: () => {
        return fetch(`${URL_PREFIX}/api/users`).then(res=>res.json())

    }, 
    login: (userObj) => {
        return fetch(`${URL_PREFIX}/api/users/login`, {
            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
    },
    signup: (userObj) => {
        return fetch(`${URL_PREFIX}/api/users/signup`, {
            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
    },
    getAllGroups: () => {
        return fetch(`${URL_PREFIX}/api/groups`).then((res) => res.json());
    },
    getGroupsByOwner: (token) => {
        return fetch(`${URL_PREFIX}/api/groups/owner`, {
            method: "GET",
            headers: {
            authorization: `Bearer ${token}`
        },
    }).then((res) => res.json());
    },
    saveGame: (gameObj, token) => {
        return fetch(`${URL_PREFIX}/api/games`, {
            method: "PUT",
            body: JSON.stringify(gameObj),
            headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json());
    },
    getGamesInaGroup: (groupid, token) => {
        return fetch(`${URL_PREFIX}/api/groups/${groupid} `, {
            headers: {
            "authorization": `Bearer ${token}`,
            },
    }).then((res) => res.json());
    },
    getVotesInaGroup: (groupid, token) => {
        return fetch(`${URL_PREFIX}/api/votes/group/${groupid} `, {
            headers: {
            authorization: `Bearer ${token}`,
            },
    }).then((res) => res.json());
    },
    createVoteInaGroup:(groupid,voteObj,token)=>{
        return fetch(`${URL_PREFIX}/api/votes/group/${groupid}`,{
            method: "PUT",
            body: JSON.stringify(voteObj),
            headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json());
    },
    countVotesofaGame: (groupid, userid, gameid, token) => {
        return fetch(`${URL_PREFIX}/api/votes/${groupid}/${userid}/${gameid} `, {
            headers: {
            "authorization": `Bearer ${token}`,
        },
    }).then((res) => res.json());
    },

    deleteGame: (id, token) => {
        return fetch(`${URL_PREFIX}/api/games/${id}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(res => res.json());
    }
};

export default API;
