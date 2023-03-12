import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import './style.css'
import API from "../../../utils/API"
import { clear } from "@testing-library/user-event/dist/clear";
import { useNavigate } from "react-router-dom";
const members = [];

// const group= ('')
const memberIds = []
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
    const [friendInput, setFriendInput] = useState('')
    const [memberIDs, setMemberIDs] = useState('')
    const [showButton, setShowButton] = useState(true)
    let navigate = useNavigate();

    const clickFriend = id => {
        setShowButton(prev => ({
            ...prev,
            [id]: !prev[id]
        })) 

    } 
    
    const getGroupName = (e) => {
        setInput(e.target.value)
    };
    const getNewFriend = (e) => {
        setFriendInput(e.target.value)
    }
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
    const newMemberId = JSON.stringify(memberIds)
    console.log(newMemberId)

    const addMember = (e) => {
        // e.preventDefault();
        const member = {
            id: e.target.getAttribute("data-id"),
            username: e.target.getAttribute("data-username")
        }
        members.push(member)
        setGroupMembers([...groupMembers, member])
        console.log(member.username)
        console.log(member.id)
        memberIds.push(member.id)
        // console.log("groupMembers:", groupMembers)
        // setFriendInput("")
        clickFriend(e.target.getAttribute("data-id"));
       
        
        
        // pull the users info from on click button
        // push the group id & group token to the user
        // fetch request group members in members area

    }
    


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
    const createNew = async (e) => {
        e.preventDefault();
        const NewIDs = memberIds.map((newMemberID) => {
            return parseInt(newMemberID)
            
        })
        const newMemberId = JSON.stringify(memberIds)
        const newNameGroup = nameGroup[0]
        console.log("newnamegroup", newNameGroup)
        setMemberIDs( newMemberId)
        
        const groupObj = {
            name: newNameGroup,
            users: NewIDs
        }
        const newGroup = await API.createGroup(groupObj, localStorage.getItem("token"));

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
                <button onClick={addGroupName} className="start-group">Start Group</button>
            </div>
            <div className="Group-Card">
                <div>
                    <h1>{nameGroup}</h1>
                    <h3>added members</h3>
                    <ul>
                        {groupMembers.map((groupMember, index) => {
                            // console.log(groupMember)
                            return (
                                <li key={index}>{groupMember.username}</li>
                            )
                        })}
                    </ul>
                </div>
                <button onClick={createNew}>add games</button>
            </div>

            <div className="Search">
                <h1 className="Search-Title">Search for friends</h1>
                <br />
                <input
                    className="search"

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
                                return(
                                <tr key={[index, users.id]}>
                                    <th >{users.username}
                                       {showButton && (

                                           <button
                                           data-id={users.id}
                                           data-username={users.username}
                                           className='userInfo' id="add-member"
                                           // value={friendInput}
                                           // onChange={getNewFriend}
                                           onClick={addMember} >
                                                +
                                            </button>
                                                )}
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

    )
}
export default StartGroup