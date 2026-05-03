import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import userThree from '../images/user/user-03.png';
import Cookies from 'js-cookie';
import SubmitRtx from './Form/FormItem/SubmitRtx';
import InputRtx from './Form/FormItem/InputRtx';
import FormProvider from './Form/FormProvider/FormProvider';
import { useState } from 'react';

const Settings = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<any>(null);
    const handleLoadingRes = (loading: boolean) => {
      setIsLoading(loading);
    };
  
    const handleSuccessRes = (success: boolean) => {
      if (success) {
       
        setIsSuccess(success);
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
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

        <div className="grid grid-cols-1">
          <div className="col-span-5 xl:col-span-5">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div>
              <div className="p-7">
              <FormProvider method="POST"
        endPoint={"auth/update"}
        loadingRes={handleLoadingRes}
        successRes={(e)=>{handleSuccessRes(e)}}
        errorRes={handleErrorRes}
        >
           <InputRtx
            data={{
              title: "Name",
              name: "name",
              type: "text",
              disabled: isLoading,
              defaultValue:Cookies.get("name"),
              required: true,
            
            }}
          />
           <InputRtx
            data={{
              title: "Email",
              name: "email",
              type: "email",
              disabled: isLoading,
              defaultValue:undefined,
              required: true,
              max:undefined,
              min:undefined
            }}
          />
    <InputRtx
            data={{
              title: "Password",
              name: "password",
              type: "password",
              disabled: isLoading,
              defaultValue:undefined,
              required: true,
              max:undefined,
              min:undefined
            }}
          />
          <InputRtx
            data={{
              title: "new Password",
              name: "newPassword",
              type: "password",
              disabled: isLoading,
              defaultValue:undefined,
              required: true,
              max:undefined,
              min:undefined
            }}
          />
           <SubmitRtx
      data={{
        title: "Change Account",
        disabled: isLoading,
      }}
    />
              </FormProvider>
              </div>
            </div>
          </div>
       
        </div>
      </div>
    </>
  );
};

export default Settings;
