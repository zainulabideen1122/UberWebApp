import './index.css'
import carIcon from "../../media/uberCarIcon.jpg"
import axios from 'axios';
import { useEffect, useState } from 'react';
const accessToken = "pk.eyJ1IjoiemFpbjA3NDciLCJhIjoiY2x4Ym9iZnhiMnhpMDJpcXN6NWc1bjIyaiJ9.NzFvBMeMuCTIsiZ8_l51xw"



function RideSelector(props) {

    const [rideDuration, setRideDuration] = useState(1);

    const carsDummyData = [
        {
            id:1,
            driverName : "Zain",
            fair: "1.5",
            distance:"5 min",
            carCategory: "Comfort"
            
        },
        {
            id:2,
            driverName : "Ali",
            fair: "2.0",
            distance:"6 min",
            carCategory: "Uber Go"
            
        },
        {
            id:3,
            driverName : "Moaz",
            fair: "1",
            distance:"3 min",
            carCategory: "Uber Mini"
            
        },
        {
            id:4,
            driverName : "Moaz",
            fair: "1",
            distance:"3 min",
            carCategory: "Uber Mini"
            
        },
        {
            id:5,
            driverName : "Moaz",
            fair: "1",
            distance:"3 min",
            carCategory: "Uber Mini"
            
        },
    ]



    // useEffect(()=>{
    //     if(props.pickUpCoordinates && props.dropOffCoordinates)
    //         {
    //             axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${props.pickUpCoordinates[0]},${props.pickUpCoordinates[1]};${props.dropOffCoordinates[0]},${props.dropOffCoordinates[1]}?access_token=${accessToken}`)
    //             .then(res=>{
    //                 console.log(res)
    //                 setRideDuration(res.data.routes[0].duration / 100)
    //             })
    //         }
    // }, [props])

    return ( 
        <>
                    <div className="driversList">
                        {carsDummyData.map(data=>{
                            return(
                                <div className="driverContainer" key={data.id}>
                                    <img src={carIcon}/>
                                    <div className="driverData">
                                        <h3>{data.carCategory}</h3>
                                        <p>{data.driverName}</p>
                                        <p style={{color:"blue"}}>{data.distance}s away</p>
                                    </div>
                                    <div className="rideFair">${(rideDuration*parseFloat(data.fair)).toFixed(2)}</div>
                                </div>
                            )
                        })}
                    </div>
                    <button className="confirmRideBtn">Confirm</button>
        </>
     );
}

export default RideSelector;