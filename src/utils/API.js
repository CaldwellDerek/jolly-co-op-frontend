const URL_PREFIX = "https://vast-brushlands-39205.herokuapp.com";
// const URL_PREFIX = "http://localhost:3001"
const API = {
  getUserData: (id, token) => {
    return fetch(`${URL_PREFIX}/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },
  isValidToken: (token) => {
    return fetch(`${URL_PREFIX}/api/users/isValidToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },
  getAllUsers: () => {
    return fetch(`${URL_PREFIX}/api/users`).then((res) => res.json());
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
  createGroup: (groupObj, token) => {
    return fetch(`${URL_PREFIX}/api/groups`, {
      method: "POST",
      body: JSON.stringify(groupObj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },
  getGroupsByOwner: (token) => {
    return fetch(`${URL_PREFIX}/api/groups/owner`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },
  addGametoGroup: (gameId, groupId, token) => {
    return fetch(`${URL_PREFIX}/api/games/${gameId}/${groupId}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  saveGame: (gameObj, token) => {
    return fetch(`${URL_PREFIX}/api/games`, {
      method: "PUT",
      body: JSON.stringify(gameObj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },
  
 
  getOneGroup: (groupid, token) => {
    return fetch(`${URL_PREFIX}/api/groups/${groupid} `, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },
 
  leaveGroup: (groupid, token) => {
    return fetch(`${URL_PREFIX}/api/groups/leave/${groupid} `, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },

  getGamesInaGroup: (groupid, token) => {
    return fetch(`${URL_PREFIX}/api/groups/${groupid} `, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },
  getVotesInaGroup: (groupid, token) => {
    return fetch(`${URL_PREFIX}/api/votes/group/${groupid} `, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },
  createVoteInaGroup: (groupid, voteObj, token) => {
    return fetch(`${URL_PREFIX}/api/votes/group/${groupid}`, {
      method: "PUT",
      body: JSON.stringify(voteObj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },
  countVotesofaGame: (groupid, gameid, token) => {
    return fetch(`${URL_PREFIX}/api/votes/game/${gameid}/group/${groupid}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },

  deleteGame: (id, token) => {
    return fetch(`${URL_PREFIX}/api/games/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },
  deleteGamefromaGroup: (groupid,gameid, token) => {
    return fetch(`${URL_PREFIX}/api/groups/delete/${groupid}/${gameid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },

  getAllGames: () => {
    return fetch(`${URL_PREFIX}/api/games`).then((res) => res.json());
  },

  countVotesofaUserofaGame: (groupid, userid, gameid, token) => {
    return fetch(`${URL_PREFIX}/api/votes/${groupid}/${userid}/${gameid} `, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },
  deteleaGroup: (groupid, voteObj, token) => {
    return fetch(`${URL_PREFIX}/api/votes/group/${groupid}`, {
      method: "DELETE",
      body: JSON.stringify(voteObj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },
  countVotesofaUserinaGroup: (groupid, userid, token) => {
    return fetch(`${URL_PREFIX}/api/votes/group/${groupid}/user/${userid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },
  sendEmail: (emailObj) => {
    return fetch(`${URL_PREFIX}/email`, {
      method: "POST",
      body: JSON.stringify(emailObj),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => res.json());
  },
  addUsersinaGroup:(groupid, usersObj, token)=>{
    return fetch(`${URL_PREFIX}/api/groups/add/${groupid}`, {
      method: "POST",
      body:JSON.stringify(usersObj),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }).then((res) => res.json());
  },
  removeUsersinaGroup:(groupid, usersObj, token)=>{
    return fetch(`${URL_PREFIX}/api/groups/remove/${groupid}`, {
      method: "POST",
      body:JSON.stringify(usersObj),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }).then((res) => res.json());
  }
};

export default API;
