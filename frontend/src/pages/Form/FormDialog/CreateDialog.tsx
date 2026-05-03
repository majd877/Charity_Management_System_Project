import { useEffect, useState } from "react"
import InputRtx from "../FormItem/InputRtx"
import SubmitRtx from "../FormItem/SubmitRtx"
import FormProvider from "../FormProvider/FormProvider"
import AlertError from "../../UiElements/AlertError"
import CheckBoxRtx from "../FormItem/CheckBoxRtx"
import SelectRtx from "../FormItem/SelectRtx"
import TextAreaRtx from "../FormItem/TextAreaRtx"
import HalfInputRtx from "../FormItem/HalfInputRtx"
import UploadRtx from "../FormItem/UploadRtx"
import { useDispatch } from "react-redux"
import { changeDisableSearch } from "../../../store/slice/search/search"
import GetLocationFromMap from "../../../hooks/maps/GetLocationFromMap"
import UploadMulltyRtx from "../FormItem/UploadMulltyRtx"
import MultiSelectRtx from "../FormItem/SelectManyRtx"
interface CreateDialogProps{
  endPoint:string;
  title:string;
  data:Array<Object>;
  actionTitle:string;
  onClose:Function
}

const CreateDialog:React.FC<CreateDialogProps>=({endPoint,title,data,onClose,actionTitle})=> {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<any>(null);
  const dispach=useDispatch();
 if (isSuccess) {

 }
 useEffect(()=>{
  dispach(changeDisableSearch(true))  
 },[])
  // Callback functions passed to FormProvider
  const handleLoadingRes = (loading: boolean) => {
    setIsLoading(loading);
  };

  const handleSuccessRes = (success: boolean) => {
    if (success) {
     
      setIsSuccess(success);
      onClose()
    }
  };
 if (isSuccess) {
 }
  const handleErrorRes = (error: any) => {
    // Set the error state
    setError(error);
  
    // Get the element by its ID and display it if it exists
    const element = document.getElementById("showError")as HTMLInputElement;
    if (element) {
      element.style.display = "block";
    }
  };
  return (
   <div className="flex flex-col gap-9 items-center">
   {/* <!-- Contact Form --> */}
   <div className="rounded-sm border border-stroke min-w-[360px] w-3/4 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
     <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
       <div className="flex justify-between">
       <h3 className="font-medium text-black dark:text-white">
         {title}
       </h3>
       <svg onClick={()=>{onClose()}}  className="w-7 h-7 fill-black dark:fill-white cursor-pointer"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
       </div>
     
     
     </div>
     <FormProvider method="POST"
        endPoint={endPoint}
        loadingRes={handleLoadingRes}
        successRes={(e)=>{handleSuccessRes(e)}}
        errorRes={handleErrorRes}>
  <div className="p-6.5">
  {data.map((item: any) => {
  if (Array.isArray(item)) {
    return (
      <div key={`Div_${item[0].name}_${item[1].name}`} className="flex flex-wrap justify-between">
        <HalfInputRtx
          key={`HalfInputRtx_${item[0].name}`}
          data={{
            type: item[0].type,
            title: item[0].title,
            name: item[0].name,
            disabled: isLoading,
            required: item[0].required,
            defaultValue: item[0].defaultValue,
          }}
        />
        <HalfInputRtx
          key={`HalfInputRtx_${item[1].name}`}
          data={{
            type: item[1].type,
            title: item[1].title,
            name: item[1].name,
            disabled: isLoading,
            required: item[1].required,
            defaultValue: item[1].defaultValue,
          }}
        />
      </div>
    );
  } else if (item.type === "map") {
    return <GetLocationFromMap key={`Map_${item.name}`} data={item} />;
  } else {
    switch (item.type) {
      case "text":
      case "email":
      case "password":
      case "time":
      case "url":
      case "number":
      case "date":
        return (
          <InputRtx
          key={`InputRtx_${item.name}_${item.type}`}
            data={{
              title: item.title,
              name: item.name,
              type: item.type,
              disabled: isLoading,
              required: item.required,
              defaultValue: item.defaultValue ?? undefined,
              max: item.max,
              min: item.min
            }}
          />
        );
      case "checkBox":
        return (
          <CheckBoxRtx
            key={`CheckBoxRtx_${item.name}`}
            data={{
              title: item.title,
              name: item.name,
              disabled: isLoading,
              defaultChecked: item.defaultValue ?? false,
            }}
          />
        );
      case "select":
        return (
          <SelectRtx
            key={`SelectRtx_${item.name}`}
            data={{
              title: item.title,
              name: item.name,
              disabled: isLoading,
              required: item.required,
              defaultValue: item.defaultValue,
              option: item.option,
            }}
          />
        );
        case "selectMany":
          return (
            <MultiSelectRtx
              key={`SelectManyRtx_${item.name}`}
              data={{
                title: item.title,
                name: item.name,
                disabled: isLoading,
                required: item.required,
                defaultValue: item.defaultValue,
                option: item.option,
              }}
            />
          );
        
      case "textArea":
        return (
          <TextAreaRtx
            key={`TextAreaRtx_${item.name}`}
            data={{
              title: item.title,
              name: item.name,
              disabled: isLoading,
              required: item.required,
              defaultValue: item.defaultValue,
            }}
          />
        );
      case "uploadMany":
        return (
          <UploadMulltyRtx
            key={`UploadManyRtx_${item.name}`}
            data={{
              title: item.title,
              name: item.name,
              disabled: isLoading,
              required: item.required,
              defaultValue: item.defaultValue,
            }}
          />
        );
      case "upload":
        return (
          <UploadRtx
            key={`UploadRtx_${item.name}`}
            data={{
              title: item.title,
              name: item.name,
              disabled: isLoading,
              required: item.required,
              defaultValue: item.defaultValue,
            }}
          />
        );
      default:
        return null;
    }
  }
})}

    <SubmitRtx
      data={{
        title: actionTitle,
        disabled: isLoading,
      }}
    />
  
   {/* ${
           isOptionSelected ? 'text-black dark:text-white' : ''
         } */}
  </div>
</FormProvider>
{error&&<AlertError data={{title:"server error", message: <div dangerouslySetInnerHTML={{ __html: error?.error }} />}} />}

   </div>
 </div>
  )
  
}

export default CreateDialog
