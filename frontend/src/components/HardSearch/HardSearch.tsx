import {  useEffect, useState } from 'react'
import CoutryMap from '../../hooks/maps/CoutryMap';
import { useGetQueryApiQuery } from '../../store/Apis/Queries/queriesSlice';
import LoaderTow from '../../common/Loader/LoaderTow';
import { useCreateMutation } from '../../store/Apis/Mutations/mutationsPostSlice';
import { useForm, FormProvider as RHFFormProvider } from "react-hook-form";
import SubmitRtx from '../../pages/Form/FormItem/SubmitRtx';
function HardSearch() {
 const { data, isFetching,  refetch } = useGetQueryApiQuery({
    name: "autoGenerate/getOld",
  });
  const [selected,setSelected]=useState(0)
  const [stop,setStop]=useState([])
  const [addNew,setAddNew]=useState(false)
  const [filter,setFilter]=useState("");
  const onSubmit = async (req:any) => {
    if (selected==0) {
      alert("seclect category first")
   return ;
    }
   const formData=new FormData();
   Object.keys(req).forEach((key) => {
    const value = req[key];
    formData.append(key, value);
    })
    await createPost({
      method: "post",
      endpoint: `autoGenerate/create/${selected}`,
      formData,
    }).unwrap();
    setSelected(0)
    setAddNew(false)
    setStop([])
    refetch()
    // window.location.reload();
  };
  // https://syriaguide.com/*
  // https://syriaguide.com/v1/autoGenerate/create/*	
  // syriaguide.com/*	

  useEffect(()=>{
setStop([])
  },[addNew])
   const [createPost, { isLoading,isSuccess }] = useCreateMutation();
    const methods = useForm();
    useEffect(()=>{
      if (!isFetching) {
       setStop(data?.oldData[0]?.search)
      }
      },[isFetching])
  if (isFetching) {
    return <div className='w-full h-[500px] flex justify-center content-center'>
    <LoaderTow/>
  </div>
  }

  return (
    <div>
       <RHFFormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
             <div className='flex gap-3'>
             <div className=' w-[400px]'>
             <div className='flex h-[75vh] overflow-auto justify-between mb-4 flex-wrap gap-4 row-span-5 flex-row'>
             <input
            type="text"
            placeholder='search'
            value={filter}
            onChange={(e:any)=>{setFilter(e.target.value)}}
            step="*"
            className="w-full rounded mb-1 border-[1.5px] h-14 border-stroke bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
              {data.category.filter((d:any)=>d.name.includes(filter)).map((item:any)=>{
                return <button  onClick={()=>{setSelected(item._id)}} type='button' key={item._id} className={`border hover:bg-gray-400 p-2 w-[130px] h-[130px] text-center ${selected==item._id||stop?.includes(item._id)?'bg-blue-300':null}`}style={{border:"2px solid",borderRadius:"12px"}}>
                  <div className='flex justify-center'>
                  {/* <img className='w-15 h-15' src={import.meta.env.VITE_IMAGE_URL+item.image}/> */}
                  </div>
                  <h1 className='mt-2 text-black dark:text-white'>{item.name}</h1>
                </button>
              })}
              </div>
              <button onClick={()=>{setAddNew(true)}} type='button' className={`flex mt-6 w-full  justify-center rounded ${data.title=="Create"?'bg-green-500':data.title=="Delete"?'bg-red-500':'bg-green-500'}  p-3 font-medium text-gray hover:bg-opacity-90`}>ADD NEW POINT</button>
             </div>
              
              <CoutryMap setStop={setStop} addNew={addNew} data={data.oldData}/>
             </div>
                <SubmitRtx data={{title:"start search",disabled:isLoading}}/>
            </form>
            </RHFFormProvider>
    </div>
  )
}

export default HardSearch
