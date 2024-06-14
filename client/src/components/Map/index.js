import { useEffect, useRef , useState} from "react";
import "./index.css"
import mapboxgl from "mapbox-gl";
import axios from "axios";
import polyline from "@mapbox/polyline";

const accessToken = "pk.eyJ1IjoiemFpbjA3NDciLCJhIjoiY2x4Ym9iZnhiMnhpMDJpcXN6NWc1bjIyaiJ9.NzFvBMeMuCTIsiZ8_l51xw"
mapboxgl.accessToken = "pk.eyJ1IjoiemFpbjA3NDciLCJhIjoiY2x4Ym9iZnhiMnhpMDJpcXN6NWc1bjIyaiJ9.NzFvBMeMuCTIsiZ8_l51xw"

function Map(props) {

  
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {

        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
          center: [69.3451,30.3753],
          zoom: 5
        });
        
        //zoom in/out, rotation controls
        map.addControl(new mapboxgl.NavigationControl());

        //gps control
        map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions:{
              enableHighAccuracy:true
            },
            trackUserLocation:true,
            showUserHeading:true
          })
        )

        

        if(props.pickUpCoordinates && props.dropOffCoordinates)
          {
              axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${props.pickUpCoordinates[0]},${props.pickUpCoordinates[1]};${props.dropOffCoordinates[0]},${props.dropOffCoordinates[1]}?access_token=${accessToken}`)
              .then(res=>{
                  addRouteToMap(map, res.data.routes[0])
              })
              .catch(err=>{
                console.log(err)
              })
          }


        if(props.pickUpCoordinates)
          {
            addToMap(map, props.pickUpCoordinates, "pickup")
          }

        if(props.dropOffCoordinates)
          {
            addToMap(map, props.dropOffCoordinates, "dropoff")
          }
        
        if(props.pickUpCoordinates && props.dropOffCoordinates)
          {
            map.fitBounds([
              [props.pickUpCoordinates[0], props.pickUpCoordinates[1]],
              [props.dropOffCoordinates[0], props.dropOffCoordinates[1]]
            ],{
              padding:100,
              zoom:15
            })
          }

          if(props.pickUpCoordinates && !props.dropOffCoordinates)
            {
              map.fitBounds([
                [props.pickUpCoordinates[0], props.pickUpCoordinates[1]],
                [props.pickUpCoordinates[0], props.pickUpCoordinates[1]]
              ],{
  
                zoom:15
              })
            }



      }, [props]);


      const addToMap = (map, coordinates, location)=>{
        if(location == "dropoff")
          {
            const marker = new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(map)
          }
          else if (location == "pickup")
            {
              const marker = new mapboxgl.Marker({
                color:"#eb4d4b"
              })
              .setLngLat(coordinates)
              .addTo(map)
            }
        
      }

      const addRouteToMap = (map, route)=>{
        const coordinates = polyline.decode(route.geometry).map(coord => [coord[1], coord[0]]);
        map.on('load',()=>{
          map.addSource('route', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'coordinates': coordinates
                            }
                      }
          });

          map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
              'line-color': '#1E90FF',
              'line-width': 8
            }
          })
        })

      }

    return ( 
        <>
        <div ref={mapContainer} className="map_Container"></div>
        </>
     );
}

export default Map;