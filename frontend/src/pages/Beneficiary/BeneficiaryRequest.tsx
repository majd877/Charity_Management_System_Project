import { useEffect } from "react";
import LoaderTow from "../../common/Loader/LoaderTow";
import { useGetQueryApiQuery } from "../../store/Apis/Queries/queriesSlice";

export default function BeneficiaryRequest() {
 const { data: item, isFetching,refetch } = useGetQueryApiQuery({
    name: `event/getWhatIHave`,
  });
  useEffect(()=>{
   if (!isFetching) {
    console.log(item.data.data);
    
   }
  },[isFetching])
  if (isFetching) {
    return <div className='w-full h-[500px] flex justify-center content-center'>
    <LoaderTow/>
  </div>
  }
  return (
    <div>
      {item.data.data.map((item:any,index:number)=>{
      return <div key={"herehheerr"+index+"hererewwe"} style={{border:"2px solid",borderRadius:"12px"}} className='w-full my-10 border-black min-h-12 relative'>
       <h1 style={{borderRadius:"12px"}} className='text-center text-title-lg text-white dark:text-black bg-black dark:bg-white absolute left-1/2 top-[-24px] -translate-x-1/2  px-5'>
       {item.name}
       </h1>
       <div hidden={item.is_hiddin} className='container'>
       <div  className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
             <img
             className="mx-auto w-1/4"
             src={`${import.meta.env.VITE_IMAGE_URL+item.image}`}
             />
            <h1 className="text-2xl my-2">
             نوع الفعالية : <span className="mx-2 text-black dark:text-white">{item.categoryDetails.name}</span>
             
            </h1>
             <h1 className="text-xl my-2">
             حالة الفعالية : <span className="mx-2 text-black dark:text-white">{item.req_status}</span>
             
            </h1>
             <h1 className="text-xl my-2">
             المستفيد : <span className="mx-2 text-black dark:text-white">{item.user.name}</span>
             
            </h1>
             <h1 className="text-xl my-2">
             وصف الطلب : 
            </h1>
           <div className="text-black dark:text-white" dangerouslySetInnerHTML={{ __html: item.description }}></div>
             <h1 className="text-xl my-2">
             ملاحظات على الطلب : 
            </h1>
           <div className="text-black dark:text-white" dangerouslySetInnerHTML={{ __html: item.note }}></div>
          <h1 className="text-2xl text-center">قائمة التبرعات</h1>
                {item.actions.length==0?
          <h1 className="text-center text-3xl text-black dark:text-white my-4">لا يوجد تبرعات حتى الان</h1>
                :<>
                <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
                 <thead>
            
            <tr  className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="py-4  flex justify-center bg-primary px-4 font-medium items-center text-3xl text-white ">
                  *
                </th>
              <th
                  key={item.key+Math.random()}
                  className="min-w-[220px] py-4 px-4 font-medium text-start text-black dark:text-white xl:pl-11"
                >
                 اسم المتبرع
                </th>
                 <th
                  key={item.key+Math.random()}
                  className="min-w-[220px] py-4 px-4 font-medium text-start text-black dark:text-white xl:pl-11"
                >
                  حالة التبرع
                </th>
                  <th
                  key={item.key+Math.random()}
                  className="min-w-[220px] py-4 px-4 font-medium text-start text-black dark:text-white xl:pl-11"
                >
                   المبلغ
                </th>
                   <th
                  key={item.key+Math.random()}
                  className="min-w-[220px] py-4 px-4 font-medium text-start text-black dark:text-white xl:pl-11"
                >
                  الملاحظات 
                </th>
            </tr>
          </thead>
          <tbody>
           {item.actions.map((element:any,key:any)=>{
            return  <tr  className="hover:bg-gray-3 dark:hover:bg-meta-4" key={key+Math.random()}>
                  <td 
                      className="border-b w-[22px] text-black dark:text-white border-[#eee]  text-center dark:border-strokedark "
                      >
                    {key+1}
                  </td>
                  <td 
                      className="border-b w-[22px] text-black dark:text-white border-[#eee]  text-start dark:border-strokedark "
                      >
                    {element?.user?.name}
                  </td>
                    <td 
                      className="border-b text-start w-[22px] text-black dark:text-white border-[#eee]  dark:border-strokedark "
                      >
                    {element?.req_status}
                  </td>
                    <td 
                      className="border-b text-start w-[22px] text-black dark:text-white border-[#eee]  dark:border-strokedark "
                      >
                    {element?.price}
                  </td>
                     <td 
                      className="border-b text-start w-[22px] text-black dark:text-white border-[#eee]  dark:border-strokedark "
                      >
           <div className="text-black dark:text-white" dangerouslySetInnerHTML={{ __html: element.note }}></div>
                  </td>
                  
                  </tr>
           })}
          </tbody>
          </table>
          </div>
                </>}
             </div>
            </div>
            </div>
        </div>
      })}
    </div>
  )
}
