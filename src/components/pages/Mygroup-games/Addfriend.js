import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import { useParams } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./style.css";

const Addfriend = (props) => {
  const members = [];
  const memberIds = [];
  const params = useParams();
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [nameGroup, setnameGroup] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [group, setGroup] = useState();
  const [groupMem, setgroupMem] = useState();
  const [msg, setmsg] = useState("Invitation has been sent to the user's email");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchGroupMembers = () => {
    API.getOneGroup(params.id, localStorage.getItem("token")).then((data) => {
      setGroup(data);
      setgroupMem(data.Users)
    });
  };

  // function containsObject(obj, list) {
  //   console.log(obj, list);

  //   for (let i = 0; i < list.length; i++) {
  //     if (list[i].username === obj.username) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  const addMember = (e) => {
    // e.preventDefault();
    const usersObj =  {users:e.target.getAttribute("data-id")}
      API.addUsersinaGroup(params.id,usersObj,localStorage.getItem("token")).then((data) => {
        console.log(data);
        fetchGroupMembers()
      });

  };

  const removeUser = (e) => {
    const usersObj =  {users:e.target.getAttribute("data-id")}
    console.log(usersObj)
      API.removeUsersinaGroup(params.id,usersObj,localStorage.getItem("token")).then((data) => {
        console.log(data);
        fetchGroupMembers()
      });
  };

  const fetchFriends = (e) => {
    if (e.target.value == "") {
      setData([]);
      return;
    }

    const fetchUsers = async () => {
      const users = await API.getAllUsers();
      var newUsers = users.filter(function (user) {
        var username = user.username.toLowerCase();
        if (username.includes(e.target.value.toLowerCase())) {
          return user;
        }
      });
      // console.log(newUsers)
      setData(newUsers);
    };
    fetchUsers();
    // addMember()
    return;
  };

  useEffect(() => {
    fetchGroupMembers();
  }, []);

  return (
    <div>
      <button onClick={handleShow} className="add-users addfriend">
        ✚
      </button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add your friend</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="">
            <div className="searchFriends">
              <h6>Search your friends by username</h6>
              <br></br>
              <input
                className="search-input"
                onChange={fetchFriends}
                placeholder="Search by username"
              />
              <br></br>
              <p>{msg}</p>
              <table>
                <tbody>
                  {data.map((users, index) => {
                    if (index < 5) {
                      return (
                        <tr key={index}>
                          <th>
                            {users.username}
                            <button
                              data-id={users.id}
                              data-username={users.username}
                              className="add-users"
                              id="add-member"
                              // value={friendInput}
                              // onChange={getNewFriend}
                              onClick={addMember}
                            >
                              +
                            </button>
                          </th>
                        </tr>
                      );
                    } else return null;
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <br></br>
          <div className="currentTeam">
            <h6>Current Team Members</h6>
            {groupMem?.map((user) => (
              <div key={user.id} className="currentUsers">
                <img></img>
                <h5>{user.username}</h5>
                <button
                  data-id={user.id}
                  data-username={user.username}
                  className="add-users"
                  id="add-member"
                  // value={friendInput}
                  // onChange={getNewFriend}
                  onClick={removeUser}
                >
                  -
                </button>
              </div>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Addfriend;
