import "./index.css"
import { IoMdSettings } from "react-icons/io";
import uberLogo from "../../media/uberLogo.jpg"
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Navbar() {

    const navigate = useNavigate()
    const [profile, setProfile] = useState([]);

    const access_token = localStorage.getItem('googleAccessToken');
    const token = localStorage.getItem('token')
    const isAuthenticate = localStorage.getItem('token') || localStorage.getItem('googleAccessToken')
   
    const logoutUser = ()=>{
        localStorage.removeItem('token')
        if(localStorage.getItem('googleAccessToken'))
            {
                googleLogout()
            }
        localStorage.removeItem('googleAccessToken')
        navigate('/landing')
    }

    useEffect(()=>{
        if(isAuthenticate)
            {
                const data = jwtDecode(isAuthenticate)
                //console.log(data)
                setProfile(data)
            }
    }, [])
    

    return ( 
        <>
            <div className="navbar">
                <div className="navbarLogo">
                   <h1 onClick={()=>{navigate('/')}}>UBER</h1>
                </div>
                <div className="navbarContent">
                    <h3>{profile?profile.name:''}</h3>
                    <h3 style={{color:"#ff7675"}}>10.0$</h3>
                    <div onClick={()=>{navigate('/settings')}}><IoMdSettings size={30} className="settingBtn" /></div>
                    <button onClick={logoutUser}>{isAuthenticate ? 'Logout':'Login'}</button>
                </div>
            </div>
        </>
     );
}

export default Navbar;