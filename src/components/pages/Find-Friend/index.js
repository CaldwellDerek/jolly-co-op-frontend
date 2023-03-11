import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import './style.css'
import API from "../../../utils/API"
import { clear } from "@testing-library/user-event/dist/clear";
const members = [];
// const group= ('')



// create function for group name
// fetch post to Groups to create group 
// hide the enter Group name, show search users.
const StartGroup = () => {
    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const [name, setName] =useState('');
    const [nameGroup, setnameGroup] = useState('');
    const [groupMembers, setGroupMembers] = useState([])
    
    const getGroupName = (e)=>{
        setInput(e.target.value)
    };
    const addGroupName = () => {
        const copyName = [...name];
        copyName.push(input);
        // console.log(copyName)
        setName([...name, input]);
        setInput("")
        
        const groupTitle = {
            name: (copyName)
        }
        // group.push(groupTitle)
        console.log(groupTitle)
        setnameGroup(copyName)
        // console.log(group)
        // API.createGroup()
    }
    
    function clearFields(){
        document.getElementById("search").value = ""
    }
    const addMember = (e) => {
        // e.preventDefault();
        const member = {
            id: e.target.getAttribute("data-id"),
            username: e.target.getAttribute("data-username")
        }
        members.push(member)
        setGroupMembers(members)
        console.log(groupMembers)
        setInput('')
       
        
        
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
        // addMember()
        return


    }
    return (

        <div className="search-page">
            <div className="group-title">
                <h3>group name:</h3>
                <input 
                    className="GroupName" 
                    type="text"
                    value={input}
                    onChange={getGroupName} 
                    placeholder="enter name of group"
                    // group-name={value.toString()}
                /> 
                <button onClick={addGroupName}className="start-group">Start Group</button>
            </div>
            <div className="Group-Card">
                <div>
                    <h1>{nameGroup}</h1>
                    <h3>added members</h3>
                    <ul>
                    {members.map((groupMember)=>{
                        return (
                           <li>{groupMember.username}</li>
                        )
                    })} 
                    </ul>
                </div>
                <button>add games</button>
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
                            {data.map((users, index) => (
                                <tr key={index}>
                                    <th >{users.username}
                                    <button 
                                    data-id={users.id} 
                                    data-username={users.username} 
                                    className='userInfo' id="add-member" 
                                    onClick={addMember} >+</button>
                                    </th>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
            </div>

        </div>

    )
}
export default StartGroup