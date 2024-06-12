
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/auth/login";
import Home from "./components/home";
import Register from "./components/auth/register";
import Navbar from "./components/Navbar";
import "mapbox-gl/dist/mapbox-gl.css"


function App()
{
  return(
    <Router>
        <AppContent/>
    </Router>
  )
}

function AppContent() {
  const location = useLocation()
  const isNavbar = location.pathname === '/auth/login' || location.pathname === '/auth/register'
  return (
      <>
        { !isNavbar && <Navbar/>}
        <Routes>
          <Route path="/auth/login" Component={Login}/>
          <Route path="/auth/register" Component={Register}/>
          <Route path="/" Component={Home}/>
        </Routes>
      </>
      
      

  );
}

export default App;
