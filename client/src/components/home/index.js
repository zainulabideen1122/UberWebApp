import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import './index.css'
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { AddressAutofill } from "@mapbox/search-js-react";
import Map from "../Map/index";
import carIcon from "../../media/uberCarIcon.jpg"
import RideSelector from "../rideSelector";
import { FaLongArrowAltLeft, FaLongArrowAltRight  } from "react-icons/fa";

const accessToken = "pk.eyJ1IjoiemFpbjA3NDciLCJhIjoiY2x4Ym9iZnhiMnhpMDJpcXN6NWc1bjIyaiJ9.NzFvBMeMuCTIsiZ8_l51xw"



function Home() {
    
    const navigate = useNavigate();
    localStorage.removeItem('googleAccessToken')
    const access_token = localStorage.getItem('googleAccessToken')
    const token = localStorage.getItem('token')
    const [pickUpCoordinates, setPickUpCoordinates] = useState()
    const [dropOffCoordinates, setDropOffCoordinates] = useState()
    const [pickUpLocation, setPickUpLocation] = useState();
    const [dropOffLocation, setDropOffLocation] = useState();
    const pickUpTimeoutRef = useRef(null);
    const dropOffTimeoutRef = useRef(null);
    const [profile, setProfile] = useState([]);
    const [closeRightNavbar, setCloseRightNavbar] = useState(false);
    const [tempPickup, setTempPickup] = useState();
    const [tempDropoff, setTempDropoff] = useState();
    const [showDriversList, setShowDriversList] = useState(false);
        

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      
      function success(pos) {
        const crd = pos.coords;

        if(crd.latitude && crd.longitude)
            {
                setPickUpCoordinates([crd.longitude, crd.latitude] )
            }
      }
      
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

    useEffect(()=>{
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
                    setProfile({
                        name:res.data.name,
                        email:res.data.email
                    })
                })
                .catch((e)=>{
                    console.log(e)
                })
            }
        else if (token)
            {
                const data = jwtDecode(token)
                //console.log(data)
            }

        if(!token)
            {
                navigate('/landing')
            }
        
        
    }) 

    useEffect(()=>{
navigator.geolocation.getCurrentPosition(success, error, options)
    }, [])


    const getPickUpLocation = async(lng, lat)=>{
        await axios.get(`https://api.mapbox.com/search/geocode/v6/reverse?`+
            new URLSearchParams({
              longitude:lng,
              latitude:lat,
              access_token: "pk.eyJ1IjoiemFpbjA3NDciLCJhIjoiY2x4Ym9iZnhiMnhpMDJpcXN6NWc1bjIyaiJ9.NzFvBMeMuCTIsiZ8_l51xw",
              limit: 1
            })
          )
          .then(res => {
            //const location = res.data.features[0].place_name;
            console.log('pickup=> ',res.data.features[0].properties.full_address)
            setTempPickup(res.data.features[0].properties.full_address)
          })
          .catch(err => {
            console.log(err);
          });
    }

    const getDropOffLocation = async(lng, lat)=>{
        await axios.get(`https://api.mapbox.com/search/geocode/v6/reverse?`+
            new URLSearchParams({
              longitude:lng,
              latitude:lat,
              access_token: "pk.eyJ1IjoiemFpbjA3NDciLCJhIjoiY2x4Ym9iZnhiMnhpMDJpcXN6NWc1bjIyaiJ9.NzFvBMeMuCTIsiZ8_l51xw",
              limit: 1
            })
          )
          .then(res => {
            //const location = res.data.features[0].place_name;
            console.log('dropOff=> ',res.data.features[0].properties.full_address)
            setTempDropoff(res.data.features[0].properties.full_address)
          })
          .catch(err => {
            console.log(err);
          });
    }

    const getPickUpCoordinates = async (pickup)=>{
        //const pickup = "Rawalpindi"
        await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?`+
            new URLSearchParams({
                access_token : "pk.eyJ1IjoiemFpbjA3NDciLCJhIjoiY2x4Ym9iZnhiMnhpMDJpcXN6NWc1bjIyaiJ9.NzFvBMeMuCTIsiZ8_l51xw",
                limit:1
            })
            )
            .then(res=>{
                setPickUpCoordinates(res.data.features[0].center)
                console.log(res.data.features[0])
            })
            .catch(err=>{
                console.log(err)
            })
    }


    const getDropOffCoordinates = async (dropoff)=>{
        await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?`+
            new URLSearchParams({
                access_token : "pk.eyJ1IjoiemFpbjA3NDciLCJhIjoiY2x4Ym9iZnhiMnhpMDJpcXN6NWc1bjIyaiJ9.NzFvBMeMuCTIsiZ8_l51xw",
                limit:1
            })
            )
            .then(res=>{
                setDropOffCoordinates(res.data.features[0].center)
                console.log(res.data.features[0])
                // setCoord(res.data.features[0].center)
            })
            .catch(err=>{
                console.log(err)
            })
            
    }
    
    const handlePickUpChange = () => {
        setPickUpLocation(tempPickup);
        // if (pickUpTimeoutRef.current) {
        //     clearTimeout(pickUpTimeoutRef.current);
        // }
        // pickUpTimeoutRef.current = setTimeout(() => {
            
        //     getPickUpCoordinates(e.target.value);
        // }, 500);
    };


    const handleDropOffChange = () => {
        setDropOffLocation(tempDropoff);
        // if (dropOffTimeoutRef.current) {
        //     clearTimeout(dropOffTimeoutRef.current);
        // }
        // dropOffTimeoutRef.current = setTimeout(() => {            
        //     getDropOffCoordinates(e.target.value);
            
        // }, 500);
    };

    function locationPicker(e){
        console.log(e.lngLat)
        getDropOffLocation(e.lngLat.lng,e.lngLat.lat)
        getPickUpLocation(pickUpCoordinates[0], pickUpCoordinates[1])
        setPickUpCoordinates([pickUpCoordinates[0], pickUpCoordinates[1]])
        setDropOffCoordinates([e.lngLat.lng,e.lngLat.lat])
        setShowDriversList(true)
    }

    const memoizedMap = useMemo(() => (
        <Map 
            pickUpCoordinates={pickUpCoordinates}
            dropOffCoordinates={dropOffCoordinates}
            locationPicker={locationPicker}
        />
    ), [pickUpCoordinates, dropOffCoordinates]);



    const handleCloseRightNavbar = () => {
        setCloseRightNavbar(!closeRightNavbar);
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 200);
    };


    const handleSearchRide = ()=>{
        // handlePickUpChange();
        // handleDropOffChange();
        console.log("z")
        setShowDriversList(true)
        setPickUpLocation(tempPickup);
        getPickUpCoordinates(tempPickup);
        setDropOffLocation(tempDropoff);
        getDropOffCoordinates(tempDropoff);


    }
    

    return ( 
        <>
        <div className="homeContainer">
            <div className={`mapContainer ${closeRightNavbar?'closeMapWidth':'openMapWidth'}`}>
                {memoizedMap}
            </div>
            <div className={`homeRightNavbar ${closeRightNavbar?'closeRightNavbarWidth':'openRightNavbarWidth'}`}>
                <div onClick={handleCloseRightNavbar} className="openCloseBtn">
                    {closeRightNavbar?<FaLongArrowAltLeft />:<FaLongArrowAltRight />}
                </div>
                <div className="bookRide">
                    <h1>Book a Ride</h1>
                    <div className="pickup">
                        <FaLocationCrosshairs />
                        <input type="text" id="pickup" placeholder="Pickup" value={tempPickup} autoComplete="address-line1" onChange={(e)=>setTempPickup(e.target.value)} />
                    </div>
                    <div className="dropoff">
                        <FaLocationDot />
                        <input type="text" id="dropoff" placeholder="Dropoff" value={tempDropoff} onChange={(e)=>setTempDropoff(e.target.value)} />
                    </div>
                    <button className="searchRideBtn" onClick={handleSearchRide}>Search Ride</button>
                </div>
                <div className="confirmRideContainer">
                    {showDriversList && <RideSelector 
                         pickUpCoordinates={pickUpCoordinates}
                         dropOffCoordinates={dropOffCoordinates}
                    />}
                </div>
            </div>
        </div>
        </>
     );
}

export default Home;