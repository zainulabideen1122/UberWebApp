
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/auth/login";
import Home from "./components/home";
import Register from "./components/auth/register";
import Navbar from "./components/Navbar";
import "mapbox-gl/dist/mapbox-gl.css"
import LandingPage from "./components/Landing";
import Settings from "./components/settings";


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
  const isNavbar = location.pathname === '/auth/login' || location.pathname === '/auth/register' || location.pathname === "/landing"
  return (
      <>
        { !isNavbar && <Navbar/>}
        <Routes>
          <Route path="/auth/login" Component={Login}/>
          <Route path="/auth/register" Component={Register}/>
          <Route path="/" Component={Home}/>
          <Route path="/landing" Component={LandingPage} />
          <Route path="/settings" Component={Settings} />

        </Routes>
      </>
      
      

  );
}

export default App;
