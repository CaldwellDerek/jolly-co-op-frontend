import React, {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from "./components/pages/Login"
import  Navbar  from "./components/Navbar"
import API from "./utils/API"
import FindGame from "./components/pages/Find-Game"
import MyList from "./components/pages/My-List"
import "./components/pages/Find-Game/style.css"
import Home from "./components/pages/Home"


function App() {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(0);

  useEffect(()=>{
    const savedToken = localStorage.getItem("token");
    console.log(savedToken)
    if(savedToken){
      API.isValidToken(savedToken).then(tokenData=>{
        if(tokenData.isValid){
          setToken(savedToken);
          setUserId(tokenData.user.id)
          setIsLoggedIn(true)
        } else {
          localStorage.removeItem("token")
        }
      })
    }
  },[])

  const logout = ()=>{
    setToken('');
    setUserId(0);
    setIsLoggedIn(false);
    localStorage.removeItem("token")
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} userId={userId} logout={logout}/>
      <br/>
      <Routes>
        <Route path="/" element={<h1>Logout Page</h1>}/>
        <Route path="/home/:id" element={<Home token={token} userId={userId}/>}/>
        <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} setIsLoggedIn={setIsLoggedIn} userId={userId}/>}/>
        <Route path="/signup" element={<h1>Signup</h1>}/>
        <Route path="/findfriend" element={<h1>Find Friend</h1>}/>
        <Route path="/findgames" element={<FindGame/>}/>
        <Route path="/mylist" element={<MyList />}/>
        <Route path="/mygroup" element={<h1>My Group</h1>}/>
        <Route path="*" element={<h1>404 page not found</h1>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
