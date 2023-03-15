import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import { useParams } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./style.css";
import { Alert, OverlayTrigger } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";

const Addfriend = (props) => {
  const params = useParams();
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(0);
  const [group, setGroup] = useState();
  const [groupMem, setgroupMem] = useState();
  const [msg, setmsg] = useState("");
  const [isOwner, setisOwner] = useState(false);
  const [ownerId, setOwnerId] = useState(false);
  const [allUsers, setallUsers] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Cannot remove user from the group without owner authorization.
    </Tooltip>
  );

  const fetchGroupMembers = () => {
    API.getOneGroup(params.id, localStorage.getItem("token")).then((data) => {
      setGroup(data);
      setgroupMem(data.Users);
      setOwnerId(data.OwnerId);
      if (data.OwnerId === props.userId) {
        setisOwner(true);
      }
    });
  };

  const EmailSubmit = (e) => {
    // e.preventDefault();
    //*find owner emails
    e.target.value = "";
    let emailContent = "";
    let emailObj = {
      recipient: "",
      email: "",
      sender: "",
      groupname: "",
      text: "",
    };
    const groupOwner = groupMem.filter((mem) => mem.id === ownerId);
    const futureMemId = e.target.getAttribute("data-id");
    const futureMem = allUsers.filter((mem) => mem.id == futureMemId);
    if (isOwner) {
      setmsg("Email has been sent to the user.");
      emailContent = `Hi, ${groupOwner[0].username}, ${props.username} just invited you to the ${group.name}. Log in to see what games they are playing!`;
      emailObj = {
        recipient: futureMem[0].username,
        email: futureMem[0].email,
        sender: props.username,
        groupname: group.name,
        text: emailContent,
      };
    } else {
      setmsg(
        "Request to add this friend has been sent to the owner of the group!"
      );
      emailContent = `Hi, ${groupOwner[0].username}, ${props.username} would like to invite his/her friend : ${futureMem[0].username} (${futureMem[0].email} to ${group.name}). Please add the user to the group!)`;
      emailObj = {
        recipient: groupOwner[0].username,
        email: groupOwner[0].email,
        sender: props.username,
        groupname: group.name,
        text: emailContent,
      };
    }
    console.log(emailObj);
    API.sendEmail(emailObj).then((data) => {
      console.log(data);
      setmsg("Your message has been sent!");
    });
  };

  const addMember = (e) => {
    // e.preventDefault();
    e.target.value = "";
    const usersObj = { users: e.target.getAttribute("data-id") };
    API.addUsersinaGroup(
      params.id,
      usersObj,
      localStorage.getItem("token")
    ).then((data) => {
      console.log(data);
      fetchGroupMembers();
      setmsg("Invitation has been sent to the user's email");
      if (alert === 0) {
        setAlert(1);
      } else {
        setAlert(0);
      }
    });
    EmailSubmit(e);
  };

  const removeUser = (e) => {
    e.target.value = "";
    const usersObj = { users: e.target.getAttribute("data-id") };
    console.log(usersObj);
    API.removeUsersinaGroup(
      params.id,
      usersObj,
      localStorage.getItem("token")
    ).then((data) => {
      console.log(data);
      fetchGroupMembers();
      if (alert === 0) {
        setAlert(1);
      } else {
        setAlert(0);
      }
    });
  };

  const fetchFriends = (e) => {
    if (e.target.value == "") {
      setData([]);
      return;
    }

    const fetchUsers = async () => {
      setmsg("");
      const users = await API.getAllUsers();
      setallUsers(users);
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

  useEffect(() => {
    if (props.change === 0) {
      props.setChange(1);
    } else {
      props.setChange(0);
    }
  }, [alert]);

  return (
    <div className="profile">
      <img
        onClick={handleShow}
        src="https://cdn-icons-png.flaticon.com/512/9898/9898762.png"
      ></img>

      <Offcanvas
        className="addfriend"
        show={show}
        onHide={handleClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add your friend</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvasbody">
          <div>
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
                            {isOwner ? (
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
                            ) : (
                              <button
                                data-id={users.id}
                                data-username={users.username}
                                className="add-users"
                                id="add-member"
                                onClick={EmailSubmit}
                              >
                                📧
                              </button>
                            )}
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
                {isOwner ? (
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
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        </Offcanvas.Body>
        <footer className="bottomBanner">
          <p className="jollycoop jollyanimation1">J</p>
          <p className="jollycoop jollyanimation2">O</p>
          <p className="jollycoop jollyanimation3">L</p>
          <p className="jollycoop jollyanimation1">L</p>
          <p className="jollycoop jollyanimation2">Y</p>
          <p className="jollycoop jollyanimation3">-</p>
          <p className="jollycoop jollyanimation1">C</p>
          <p className="jollycoop jollyanimation2">O</p>
          <p className="jollycoop jollyanimation3">O</p>
          <p className="jollycoop jollyanimation1">P</p>
        </footer>
      </Offcanvas>
    </div>
  );
};

export default Addfriend;
