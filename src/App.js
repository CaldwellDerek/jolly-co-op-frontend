import {BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <h1>Navbar</h1>
      <br/>
      <Routes>
        <Route path="/" element={<h1>Homepage</h1>}/>
        <Route path="/login" element={<h1>Login</h1>}/>
        <Route path="/signup" element={<h1>Signup</h1>}/>
        <Route path="/findfriend" element={<h1>Find Friend</h1>}/>
        <Route path="/mygroup" element={<h1>Group Page</h1>}/>
        <Route path="/mylist" element={<h1>My List</h1>}/>
        <Route path="*" element={<h1>404 page not found</h1>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
