import React, { useEffect, useState } from "react";
import { GoogleMap, InfoWindow, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
interface SelectMarkerInterface{
  id:number;
  type:string;
}
let center = {
  lat: 24.7136, 
  lng: 46.6753,
};



function GoogleMapPage({data}:any) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDdZeLxjZgc7hbkECSRXH9QCxNObcZa7H4",
  });
  center.lat=data?.data[Math.floor(data?.data?.length/2||0)]?.location?.latitude
  center.lng=data?.data[Math.floor(data?.data?.length/2||0)]?.location?.longitude
  const [selectedMarker, setSelectedMarker] = useState<SelectMarkerInterface|null>(null);

  const handleMarkerClick = (marker:any) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };
 const [height,setHeight]=useState("25vw");
 useEffect(()=>{
  if (window.location.pathname=="/map") {
    setHeight("40vw")
  }
 },[])
  
  const polylineOptions = {
    strokeColor: "#1C2434", 
    strokeOpacity: 1.0,
    strokeWeight: 2, 
  };
 if (data?.data?.length===0) {
  return <div className="h-[22vw] flex items-center justify-center ">
    <h1 className="text-black dark:text-white text-center text-xl ">no data found</h1>
  </div>
 }

  return (
    <div>
      {isLoaded &&(
        <GoogleMap
          mapContainerStyle={{ height: height, width: "100%" }}
          center={center}
          zoom={10}
        >
    {data?.data.map((item: any) => (
  <React.Fragment key={`item-fragment-${item.id}`}>
    <Marker
      key={`marker-master-${item.id}`}
      position={{ lat: item.location.latitude, lng: item.location.longitude }}
      icon={{
        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      }}
      onClick={() => handleMarkerClick({ id: item.id, type: "master" })}
    >
      {selectedMarker?.id === item.id && selectedMarker?.type === "master" && (
        <InfoWindow key={`infowindow-master-${item.id}`} onCloseClick={handleInfoWindowClose} zIndex={200}>
          <div>
            <div className="w-full flex justify-center my-2">
              <img className="w-12 h-12" src={import.meta.env.VITE_IMAGE_URL + item.image} alt="" />
            </div>
            <h4 className="text-[14px] text-black">name:&nbsp; {item.profile.name}</h4>
            <p className="text-[14px] text-black">email: &nbsp;{item.user.email}</p>
            <p className="text-[14px] text-black">phone:&nbsp; {item.profile.phone}</p>
          </div>
        </InfoWindow>
      )}
    </Marker>

    {item?.accountant_with_location?.map((marker: any) => (
      <Marker
        key={`marker-accountant-${item.id}-${marker.id}`}
        position={{ lat: marker.location.latitude, lng: marker.location.longitude }}
        icon={{
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        }}
        onClick={() => handleMarkerClick({ id: marker.id, type: "accountant" })}
      >
        {selectedMarker?.id === marker.id && selectedMarker?.type === "accountant" && (
          <InfoWindow key={`infowindow-accountant-${marker.id}`} onCloseClick={handleInfoWindowClose} zIndex={200}>
            <div>
              <div className="w-full flex justify-center my-2">
                <img className="w-12 h-12" src={import.meta.env.VITE_IMAGE_URL + marker.image} alt="" />
              </div>
              <h4 className="text-[14px] text-black">name:&nbsp; {marker.profile.name}</h4>
              <p className="text-[14px] text-black">email: &nbsp;{marker.user.email}</p>
              <p className="text-[14px] text-black">phone:&nbsp; {marker.profile.phone}</p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    ))}

    {item?.accountant_with_location?.map((marker: any) => (
      <Polyline
        key={`polyline-${item.id}-${marker.id}`}
        path={[
          { lat: item.location.latitude, lng: item.location.longitude },
          { lat: marker.location.latitude, lng: marker.location.longitude },
        ]}
        options={polylineOptions}
      />
    ))}
  </React.Fragment>
))}

    
        </GoogleMap>
      )}
     
    </div>
  );
}

export default GoogleMapPage;
