import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import './style.css'
import API from "../../../utils/API"
const members = [];

const FindFriend = () => {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");

    const fetchFriends = (e) => {
        // setQuery(e.target.value)
        const fetchUsers = async () => {
            const users = await API.getAllUsers();
            var newUsers = users.filter(function (user) {
                var username = user.username.toLowerCase()
                if (username.includes(e.target.value.toLowerCase())) {
                    return user
                }
            })
            console.log(newUsers)
            setData(newUsers);
            document.querySelector('#add-member').addEventListener('click', e => {
                members.push(data);
            })
        }
        fetchUsers()
        return
    }


return (

    <div>
        <div className="Search">
            <h1 className="Search-Title">Search for friends</h1>
            <div className="SearchBar">
                <h3>Enter username to add friends to group</h3>

                <input className="search" onChange={fetchFriends} placeholder="Search by name" />
                {/* {<UserTable data={[data]}/>} */}
                <table>
                    <tbody>
                        <tr>
                            <th> Username:</th>
                        </tr>
                        {data.map((users) => (
                            <tr key={users.id}>
                                <th>{users.username}<button id="add-member">+</button>
                                </th>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>

            </div>
        </div>

        <div className="Group-Card">
            <div>
                <h3>group name:<input className="GroupName" id="group-name" placeholder="enter name of group"></input> </h3>
            </div>

            <div>
                {/* <h3>added members</h3>
                    <tr key={members.id}>
                        <th>{members.username}<button className="delete-member">+</button></th>
                    </tr>  */}
            </div>
            <button>submit</button>
        </div>

    </div>
)
}
export default FindFriend