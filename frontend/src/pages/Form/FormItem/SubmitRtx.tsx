import React from 'react'
import LoaderTow from '../../../common/Loader/LoaderTow'
interface SubmitInputProps {
 data: {
   title: string;
   disabled: boolean | undefined;
 };
}
const SubmitRtx:React.FC<SubmitInputProps> = ({ data })=> {
  return (
   <button type='submit' disabled={data.disabled} className={`flex mt-6 w-full  justify-center rounded ${data.title=="Create"?'bg-green-500':data.title=="Delete"?'bg-red-500':'bg-primary'}  p-3 font-medium text-gray hover:bg-opacity-90`}>
   {data.disabled?<LoaderTow/>:data.title}
     </button>
  )
}

export default SubmitRtx
