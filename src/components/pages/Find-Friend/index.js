import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import './style.css'
import API from "../../../utils/API"
import { clear } from "@testing-library/user-event/dist/clear";
import { useNavigate } from "react-router-dom";
const members = [];

// const group= ('')
let memberIds = []
console.log("memberIds", memberIds)




// create function for group name
// fetch post to Groups to create group 
// hide the enter Group name, show search users.
const StartGroup = () => {
    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const [name, setName] = useState('');
    const [nameGroup, setnameGroup] = useState('');
    const [groupMembers, setGroupMembers] = useState([])
    // console.log(groupMembers)

    const getGroupName = (e) => {
        setInput(e.target.value)
    };
    // const getNewFriend = (e) => {
    //     setFriendInput(e.target.value)
    // }
    const addGroupName = () => {
        const copyName = [...name];
        copyName.push(input);
        setName([...name, input]);
        setInput("")

        const groupTitle = {
            name: (copyName)
        }

        console.log(groupTitle)
        setnameGroup(copyName)

    }


    function containsObject(obj, list) {
        // console.log(obj,list)
        
        for  (let i = 0; i < list.length; i++) {
            if (list[i].username === obj.username) {
                return true;
            }
        }
    
        return false;
    }
    const addMember = (e) => {
        // e.preventDefault();
        const member = {
            id: e.target.getAttribute("data-id"),
            username: e.target.getAttribute("data-username")
        }

        console.log(containsObject(member,groupMembers))
        if (!containsObject(member,groupMembers)) {
        members.push(member)
        // console.log(members)
        setGroupMembers([...groupMembers, member])
        memberIds.push(member.id)
        }
        // console.log("groupMembers:", groupMembers)
        // setFriendInput("")
    }


    
    const removeUser = (id) => {
            const removed = groupMembers.filter((groupMember) => groupMember.id !== id)
            setGroupMembers(removed);
            const removedIds = memberIds.filter((groupMember) => groupMember !== id)
            memberIds=removedIds
            // console.log(removedIds)
            // console.log(groupMembers)
            // console.log(memberIds)
            
        };
  


    const fetchFriends = (e) => {
        if (e.target.value == "") {
            setData([])
            return
        }

        const fetchUsers = async () => {
            const users = await API.getAllUsers();
            var newUsers = users.filter(function (user) {
                var username = user.username.toLowerCase()
                if (username.includes(e.target.value.toLowerCase())) {
                    return user
                }
            })
            // console.log(newUsers)
            setData(newUsers);

        }
        fetchUsers()
        // addMember()
        return


    }
    const createNewMyGroups = async () => {
            
        const groupObj = {
            name: nameGroup[0],
            users: memberIds
        }
        if (nameGroup.length===0){
            alert("you need a name!")
        } 
        else if (groupObj.users.length===0){
            alert("you havent added anyone in the group! Please search for friends")
        }
        else { 
            const newGroup = await API.createGroup(groupObj, localStorage.getItem("token"));
            return (
            window.location.href = "/mygroup"
        )
        }

        // let path = `/mylist`;
        // navigate(path);
        
    }
    const createNewAddGames = async () => {
            
        const groupObj = {
            name: nameGroup[0],
            users: memberIds
        }  
        console.log(groupObj)
        if (nameGroup.length===0){
            alert("you need a name!")
        } 
        else if (groupObj.users.length===0){
            alert("you havent added anyone in the group! Please search for friends")
        } 
        else { 
            const newGroup = await API.createGroup(groupObj, localStorage.getItem("token"));
            console.log(newGroup)
            // return (
            //     window.location.href = "/mylist"
            // )
        }
        // const newGroup = await API.createGroup(groupObj, localStorage.getItem("token"));

        // let path = `/mylist`;
        // navigate(path);
    
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
                <br />
                <br/>
                <button onClick={addGroupName} className="button-74" >Start Group</button>
            </div>
            <div className="main">

                <div className="Group-Card">
                        <h1>{nameGroup}</h1>
                        <h3>Added members</h3>
                    <div className="add-list">
                        <ul>
                            {groupMembers.map((groupMember, index) => {
                                // console.log(groupMember)
                                return (
                                    <li key={index}>{groupMember.username}  <button className="delete-users" onClick={() => removeUser(groupMember.id)}>-</button><br /></li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="options">
                        <p>You may add games now, or add them from your list later!</p>
                        <button className="button-74" onClick={createNewAddGames}>add games</button>
                        <br></br>
                        <br></br>
                        <button className="button-74" onClick={createNewMyGroups}>See all groups</button>
                    </div>
                </div>

                <div className="Search">
                    <h1 className="Search-Title">Search for friends</h1>
                    <br />
                    <input
                        className="search-input"
                        onChange={fetchFriends}
                        placeholder="Search by name"


                    />

                    <table>
                        <tbody>
                            <tr>
                                <th> Results</th>
                            </tr>
                            {data.map((users, index) => {
                                if (index < 5) {
                                    return (
                                        <tr key={index}>
                                            <th >{users.username}
                                        
                                                <button
                                                    data-id={users.id}
                                                    data-username={users.username}
                                                    className='add-users' id="add-member"
                                                    // value={friendInput}
                                                    // onChange={getNewFriend}
                                                    onClick={addMember} >+</button>
                                            </th>
                                        </tr>
                                    )
                                } else return null
                            }
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

    )
}
export default StartGroup