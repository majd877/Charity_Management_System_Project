import { useForm, FormProvider as RHFFormProvider } from "react-hook-form";
import { ReactNode, useEffect } from "react";
import { useCreateMutation } from "../../../store/Apis/Mutations/mutationsPostSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { reloadSideBarAction } from "../../../store/slice/search/search";
const Admin_Hash="12314sgkehjnreklrwjhkahklargkraejkgrgjerhaljHEREHEREHERE"
interface FormProviderProps {
  children: ReactNode;
  endPoint: string;
  method: string;
  loadingRes: (loading: boolean) => void;
  successRes: (success: boolean) => void;
  errorRes: (error: any) => void;
}

export default function FormProvider({ 
  children, method, endPoint, loadingRes, successRes, errorRes 
}: FormProviderProps) {
  const setErrorCookie = (res:any) => {
 // Save permissions (array) to localStorage
const perms = Array.isArray(res?.user?.permission) ? res.user.permission : [];
localStorage.setItem("permission", JSON.stringify(perms));
    Cookies.set('name',res.user.name, {
      expires: 7,
      secure: true,
      sameSite: 'strict',
    });
     Cookies.set('user_type',res.user.user_type, {
      expires: 7,
      secure: true,
      sameSite: 'strict',
    });
    Cookies.set('email',res.user.email, {
      expires: 7,
      secure: true,
      sameSite: 'strict',
    });
    if (res?.user?.is_admin&&res?.user?.is_admin==Admin_Hash) {
      Cookies.set('adhkfdkljdfahadfhadfhwey',"hfdfdfdfeess", {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
    }else{
      Cookies.set('adhkfdkljdfahadfhadfhwey',"hhrreesscfgnn", {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
    }
    Cookies.set('authToken',res.tokens.accessToken, {
      expires: 7,
      secure: true,
      sameSite: 'strict',
    });
  window.location.reload();
  };
  const selector=useSelector((state:any)=>state.search);
  const dispach=useDispatch();
  const [createPost, { isLoading, isSuccess, error }] = useCreateMutation();
  const onSubmit = async (data: any) => {
    const formData = new FormData();
  
    // معالجة باقي البيانات
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value instanceof FileList) {
        Array.from(value).forEach((file) => {
          formData.append(key, file);
        });
      } 
      else if (value !== null && value !== undefined) {
        if (Array.isArray(value) && value[0]?.origin instanceof File) {
          // معالجة الصور
          value.forEach((item: any) => {
            formData.append(key, item.origin); // إرسال الملفات الأصلية
          });
        }  else if (key !== "copy-from-google") {
          formData.append(key, value);
        }
      }
    });
  
    try {
   
      const res = await createPost({
        method,
        endpoint: endPoint,
        formData,
      }).unwrap();
  
      if (selector.length) {
        window.location.reload();
      }
  
      if (endPoint === "login" || endPoint === "auth/login"||endPoint=="auth/update") {
        console.log(res);
        setErrorCookie(res);
      }
    } catch (error) {
      console.error('Error submitting form', error);
      Cookies.set('secureCookie', 'value', {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
    }
  };
  
  

  // Handle the loading, success, and error states
  useEffect(() => {
    loadingRes(isLoading);
    successRes(isSuccess);
    errorRes(error);
  }, [isLoading, isSuccess, error, loadingRes, successRes, errorRes]);
  useEffect(()=>{
    dispach(reloadSideBarAction())
  },[isSuccess])
  const methods = useForm();
 
  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </RHFFormProvider>
  );
}
