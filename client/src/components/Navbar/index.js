import "./index.css"
import { IoMdSettings } from "react-icons/io";
import uberLogo from "../../media/uberLogo.jpg"
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

function Navbar() {

    const navigate = useNavigate()
    const isAuthenticate = localStorage.getItem('token') || localStorage.getItem('googleAccessToken')
    console.log("zain=> ",isAuthenticate)
    const logoutUser = ()=>{
        localStorage.removeItem('token')
        if(localStorage.getItem('googleAccessToken'))
            {
                googleLogout()
            }
        localStorage.removeItem('googleAccessToken')
        navigate('/auth/login')
    }

    return ( 
        <>
            <div className="navbar">
                <div className="navbarLogo">
                   <h1>UBER</h1>
                </div>
                <div className="navbarContent">
                    <h3>Name</h3>
                    <h3>Credit</h3>
                    <IoMdSettings size={30} className="settingBtn" />
                    <button onClick={logoutUser}>{isAuthenticate ? 'Logout':'Login'}</button>
                </div>
            </div>
        </>
     );
}

export default Navbar;