import React from 'react'
import GoogleMapPage from '../../hooks/maps/GoogleMap'
import { useGetQueryShearQuery } from '../../store/Apis/Queries/shearQuery';
import Loader from '../../common/Loader';

var name="map/getMap" 
const Map:React.FC=({pathName}:any|undefined)=> {
 if (pathName) {
  name=pathName;
 }
  const { data, isError, isLoading } = useGetQueryShearQuery({
  name: name,
});
if (isLoading||isError) {
 return <Loader/>
}
  return (
    <div>
      <GoogleMapPage data={data}/>
    </div>
  )
}

export default Map
