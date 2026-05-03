import React, { useEffect, useState, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import { LoadScript, LoadScriptNext, StandaloneSearchBox } from '@react-google-maps/api';
const GetLocationFromMap: React.FC<any> = ({ data }: any) => {
  const { control, setValue } = useFormContext();
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number }>({
    lat:33.47321649811219,
    lng:36.26265831762914
  });
  const searchBoxRef = useRef<any>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    if (data?.defaultValue) {
      const { latitude, longitude } = data.defaultValue;
      if (latitude && longitude) {
        setMarkerPosition({ lat: latitude, lng: longitude });
        setValue('latitude', latitude);
        setValue('longitude', longitude);
        return
      }
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const position = { lat: coords.latitude, lng: coords.longitude };
          setMarkerPosition(position);
          setValue('latitude', coords.latitude);
          setValue('longitude', coords.longitude);
          return
        },
        (error) => console.error('Error fetching location:', error)
      );
    }
  }, [data, setValue]);

  const handleMapClick = (e: any):void => {
    console.log(e.detail.latLng);
    
    if (e.detail) {
      const lat = e.detail.latLng.lat;
      const lng = e.detail.latLng.lng;
      setMarkerPosition({ lat, lng });
      setValue('latitude', lat);
      setValue('longitude', lng);

      if (infoWindowRef.current) {
        infoWindowRef.current.setPosition({ lat, lng });
      }
    }
  };

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces();
   
    
    if (places && places.length > 0) {
      const place = places[0];

      const location = place.geometry?.location;
      if (location) {
        const lat = location.lat();
        const lng = location.lng();
        setMarkerPosition({ lat, lng });
        setValue('latitude', lat);
        setValue('longitude', lng);
      }
    }
  };

  return (
    <div>
      <label className="mb-2.5 block text-black dark:text-white">
        {data.title} {data.required && <span className="text-meta-1">*</span>}
      </label>
      <LoadScriptNext children={
      <>
        <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={handlePlacesChanged}
      >
        <input
          type="text"
          placeholder="ابحث عن مكان..."
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          style={{ marginBottom: '10px' }}
        /> 
    </StandaloneSearchBox>
      <APIProvider apiKey="AIzaSyDdZeLxjZgc7hbkECSRXH9QCxNObcZa7H4">
      <Map
      style={{width: '100%', height: '50vh'}}
      center={markerPosition}
      scaleControl
      defaultZoom={18}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      onClick={(e)=>{handleMapClick(e)}}
    >
       <Marker position={markerPosition} />
      </Map>
</APIProvider> 
      </>
      } googleMapsApiKey="AIzaSyDdZeLxjZgc7hbkECSRXH9QCxNObcZa7H4" libraries={["places"]}>
      {/* Search Box */}
   
</LoadScriptNext>
      {/* Hidden Latitude Input */}
      <Controller
        control={control}
        name="latitude"
        render={({ field }) => (
          <input hidden {...field} id="latitude" required={data.required} type="number" step="any" />
        )}
      />

      {/* Hidden Longitude Input */}
      <Controller
        control={control}
        name="longitude"
        render={({ field }) => (
          <input hidden {...field} id="longitude" required={data.required} type="number" step="any" />
        )}
      />
    </div>
  );
};

export default GetLocationFromMap;
