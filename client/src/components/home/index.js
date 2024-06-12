import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import './index.css'
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import mapboxgl from "mapbox-gl";


mapboxgl.accessToken = "pk.eyJ1IjoiemFpbjA3NDciLCJhIjoiY2x4Ym9iZnhiMnhpMDJpcXN6NWc1bjIyaiJ9.NzFvBMeMuCTIsiZ8_l51xw"

function Home() {
    
    const navigate = useNavigate();
    localStorage.removeItem('googleAccessToken')
    const access_token = localStorage.getItem('googleAccessToken')
    const token = localStorage.getItem('token')
     

    const [userProfile, setUserProfile] = useState();
    
    useEffect(()=>{
        console.log(localStorage.getItem('googleAccessToken'), " <=")
        if(access_token)
            {
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,{
                    headers:{
                        Authorization:`Bearer:${access_token}`,
                        Accept:'application/json'
                    }
                })
                .then((res)=>{
                    console.log(res)
                })
                .catch((e)=>{
                    console.log(e)
                })
            }
        else if (token)
            {
                const data = jwtDecode(token)
                console.log(data)
            }

        // if(!token)
        //     {
        //         navigate('/auth/login')
        //     }
    })
    const [value, setValue] = useState(null);

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [lng, lat],
          zoom: 9
        });
      }, []);
      

    return ( 
        <>
        <div className="homeContainer">
            <div ref={mapContainer} className="mapContainer">
                    {console.log("Map is showing!")}
            </div>
            <div className="homeRightNavbar">
                <div className="bookRide">
                    <h1>Book a Ride</h1>
                    <div className="pickup">
                        <FaLocationCrosshairs />
                        <input type="text" id="dropoff" placeholder="Dropoff" />
                    </div>
                    <div className="dropoff">
                        <FaLocationDot />
                        <input type="text" id="dropoff" placeholder="Dropoff" />
                    </div>
                    <button className="searchRideBtn">Search Ride</button>
                </div>
            </div>
        </div>
        </>
     );
}

export default Home;