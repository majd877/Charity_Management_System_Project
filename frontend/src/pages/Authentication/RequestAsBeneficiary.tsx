import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDisableSearch } from "../../store/slice/search/search";
import CreateDialog from "../Form/FormDialog/CreateDialog";
import Tables from "../Tables";
import AlertSuccess from "../UiElements/AlertSuccess";
import { useGetQueryApiQuery } from "../../store/Apis/Queries/queriesSlice";
import LoaderTow from "../../common/Loader/LoaderTow";
import { useNavigate } from "react-router-dom";
const RequestAsBeneficiary = () => {
  const [openCreate, setOpenCreate] = useState(false);
   const navgate=useNavigate();
  const [create,setCreate]=useState<any[]>([
    {
      type: "upload",
      title: "الصورة",
      name: "file",
      defaultValue: undefined,
    },
    {
     type: "select",
     title:"نوع الطلب الذي يحتاجه",
     name: "category",
     option:[],
     defaultValue: undefined,
   },
    {
      type: "text",
      title: "الاسم",
      name: "name",
      required: true,
      defaultValue: undefined,
    },
    {
      type: "textArea",
      title: "الوصف",
      name: "about",
      required: true,
      defaultValue: undefined,
    },
     {   
  type:"email",
  title:"email",
  name:"email",
  required:false, 
  defaultValue:undefined 
 },
 {   
  type:"password",
  title:"كلمة المرور",
  name:"password",
  required:false, 
  defaultValue:undefined 
 },
 {   
  type:"number",
  title:"رقم الهاتف",
  name:"phone",
  required:true, 
  defaultValue:undefined 
 },
  
  ])
  const [isSuccess, setIsSuccess] = useState(false);
const { data, isLoading, isError, refetch } = useGetQueryApiQuery({
    name: "Category/getName",
  });
  



  useEffect(() => {
    const element = document.getElementById("showSussess") as HTMLInputElement;

    if (element) {
      element.style.display = "block";
    }

    setTimeout(() => {
      setIsSuccess(false);
    }, 6000);
  }, [openCreate]);



  const handleCloseCreate = () => {
    setOpenCreate(false);
    setIsSuccess(true);
    setTimeout(() => {
     navgate("/")
    }, 2000);
  };
  useEffect(()=>{
   if (!isLoading) {
    
    create[1].option=data.data.map((item:{_id:string,name:string}) => ({ id: item._id, name: item.name }))
        
   }
  },[isLoading])
  if (isLoading) {
   return <div className="flex justify-center h-[70vh]"><LoaderTow/></div>
  }
 
    return (
     <>
      <CreateDialog
        data={create}
        title="طلب انضمام كمستفيد"
        endPoint="Beneficiary/create"
        onClose={() => handleCloseCreate()}
        actionTitle={"Create"}
        
      />
     {isSuccess && <AlertSuccess />}
     </>
     
    );
 
};

export default RequestAsBeneficiary;