import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import './style.css'
import API from "../../../utils/API"
const members = [];

const showMembers = [];
// create function for group name
// fetch post to Groups to create group id and include group owners token
// hide the enter Group name, show search users.




const FindFriend = () => {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");

    const addMember = (e) => {
        e.preventDefault();
        // console.log(e.target.getAttribute('data-user'))
        // console.log(e.target.getAttribute('data-username'))
        members.push(e.target.getAttribute('data-user'));
        showMembers.push(e.target.getAttribute('data-username'))
        console.log(members)
        console.log(showMembers)




        return
        // pull the users info from on click button
        // push the group id & group token to the user
        // fetch request group members in members area

    }


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
        }
        fetchUsers()
        addMember()
        return


    }
    return (

        <div className="search-page">
            <div className="group-title">
                <h3>group name:<input className="GroupName" id="group-name" placeholder="enter name of group"></input> </h3>
                <button className="start-group">Start Group</button>
            </div>

            <div className="Search">
                <h1 className="Search-Title">Search for friends</h1>  
                    <br />
                    <input className="search" onChange={fetchFriends} placeholder="Search by name" />
                    <table>
                        <tbody>
                            <tr>
                                <th> Results</th>
                            </tr>
                            {data.map((users) => (
                                <tr>
                                    <th >{users.username}<button data-user={[users.id]} data-username={[users.username]} className='userInfo' id="add-member" onClick={addMember} >+</button>
                                    </th>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
            </div>

            <div className="Group-Card">
                <div>
                    <h3>added members</h3>
                    <table>
                        <tbody>
                            {showMembers.map((value) => {
                                <tr>
                                    <th><button className="delete-member">-</button></th>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <button>add games</button>
            </div>
        </div>

    )
}
export default FindFriend