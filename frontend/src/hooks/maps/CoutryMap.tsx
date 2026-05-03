import {  LoadScript} from "@react-google-maps/api";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import React, {  useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Polygon } from "./polygon";
import { Polyline } from "./polyline";
import { Circle } from "./CircleMap";
import {POLYGONS} from './encoded-polygon-data';
const CoutryMap = ({ data, setStop,addNew }: {addNew:boolean, data: any; setStop: (value: any) => void }) => {
   const { control, setValue } = useFormContext();
   
    const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number }>({
       lat:33.47321649811219,
       lng:36.26265831762914
     });
     const [radius, setRadius] = React.useState(1000);
   
     const changeCenter = (newCenter: google.maps.LatLng | null) => {
       if (!newCenter) return;
       setMarkerPosition({lng: newCenter.lng(), lat: newCenter.lat()});
     };
  const handleMapClick = (e: any):void => {
    console.log(e.detail.latLng);
    
    if (e.detail) {
      const lat = e.detail.latLng.lat;
      const lng = e.detail.latLng.lng;
      setMarkerPosition({ lat, lng });
      setValue('latitude', lat);
      setValue('longitude', lng);
      setValue("radius",500)
   
    }
  };
  useEffect(()=>{
if (addNew) {
  setMarkerPosition({lat:markerPosition.lat+0.5,lng:markerPosition.lng+0.5})
setValue('latitude', markerPosition.lat+0.5);
setValue('longitude', markerPosition.lng+0.5);
setValue("radius",radius)
}

  },[addNew])
 const changeCurrent=(e:any)=>{
  if (addNew) {
    alert("u have add a new point")
    return
  }
  
  setValue('latitude', e.latitude);
  setValue('longitude', e.longitude);
  setValue("radius",e.radius)
  setMarkerPosition({lng:e.longitude,lat:e.latitude})
  setRadius(e.radius||500)
  setStop(e.search)
 }
 useEffect(()=>{
  setValue('latitude', markerPosition.lat);
  setValue('longitude', markerPosition.lng);
  setValue("radius",radius)
 },[])
  return (
       <APIProvider apiKey="AIzaSyDdZeLxjZgc7hbkECSRXH9QCxNObcZa7H4">
                   <Map
                   defaultCenter={markerPosition}
                   onClick={(e)=>{handleMapClick(e)}}
                   style={{width: '100%', height: '80vh'}}
                   defaultZoom={12}
                   gestureHandling={'greedy'}
                   disableDefaultUI={true}
                 >
           {addNew&&<>
            <Marker position={markerPosition} />
             <Polygon strokeWeight={1.5} encodedPaths={POLYGONS} />
        <Polyline
          strokeWeight={10}
          strokeColor={'#ff22cc88'}
          encodedPath={POLYGONS[11]}
        />
        <Circle
          radius={radius}
          center={markerPosition}
          onRadiusChanged={setRadius}
          onCenterChanged={changeCenter}
          strokeColor={'#0c4cb3'}
          strokeOpacity={.1}
          strokeWeight={3}
          fillColor={'#3b82f6'}
          fillOpacity={0.3}
          onClick={(e)=>{console.log(e);
          }}
          editable
          draggable
        /></>}
      <>
      {data?.map((item:any)=>{
        return <>
                 <Marker position={{lat:parseFloat(item.latitude),lng:parseFloat(item.longitude)}} />
             <Polygon strokeWeight={1.5} encodedPaths={POLYGONS} />
        <Polyline
          strokeWeight={10}
          strokeColor={'#ff22cc88'}
          encodedPath={POLYGONS[11]}
        />
        <Circle
          radius={parseFloat(item.radius)||500}
          center={{lat:parseFloat(item.latitude),lng:parseFloat(item.longitude)}}
          strokeColor={markerPosition.lat==item.latitude?"red":'#0c4cb3'}
          strokeOpacity={.1}
          strokeWeight={3}
          key={item._id}
          fillColor={markerPosition.lat==item.latitude?"red":'#0c4cb3'}
          fillOpacity={0.3}
          onClick={(e)=>{
           changeCurrent(item)
          }}
          editable
          draggable
        />
        </>
      })}
      
     </>
                    <Controller
        control={control}
        name="latitude"
        render={({ field }) => (
          <input hidden {...field}  id="latitude"  type="number" step="any" />
        )}
      />

      {/* Hidden Longitude Input */}
      <Controller
        control={control}
        name="longitude"
        render={({ field }) => (
          <input hidden {...field}  id="longitude" type="number" step="any" />
        )}
      />
       <Controller
        control={control}
        name="radius"
        render={({ field }) => (
          <input hidden  {...field} id="radius"  type="number" step="any" />
        )}
      />
                   </Map>
             </APIProvider>
  );
};

export default CoutryMap;
