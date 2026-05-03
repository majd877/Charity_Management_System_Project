import { useEffect, useState } from "react";
import CreateDialog from "../Form/FormDialog/CreateDialog";
import Tables from "../Tables";
import { useDispatch } from "react-redux";
import { changeDisableSearch } from "../../store/slice/search/search";
import AlertSuccess from "../UiElements/AlertSuccess";
import { useNavigate } from "react-router-dom";
let create:any=[
 {   
  type:"upload",
  title:"الصورة",
  name:"file",
  required:true, 
  defaultValue:undefined 
},
 {   
  type:"text",
  title:"الاسم",
  name:"name",
  required:true, 
  defaultValue:undefined 
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
 {   
  type:"number",
  title:"الراتب",
  name:"salary",
  required:true, 
  defaultValue:undefined 
 },
 {   
  type:"textArea",
  title:"البيانات",
  name:"about",
  required:true, 
  defaultValue:undefined 
 },

 
]

const RequestAsEmployee = () => {
  const [openCreate,setOpenCreate]=useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navgate=useNavigate();
  useEffect(() => {
    const element = document.getElementById("showSussess") as HTMLInputElement;

    if (element) {
      element.style.display = "block";
    }

    setTimeout(() => {
      setIsSuccess(false);
    }, 6000);
  }, [openCreate]);


  const handleCloseCreate= () => {
    setOpenCreate(false); 
    setIsSuccess(true)
    setTimeout(() => {
     navgate("/")
    }, 2000);
  };
 
  return (<> <CreateDialog
    data={create}
    title="طلب انضمام كموظف"
    endPoint="representative/create"
    onClose={()=>{handleCloseCreate()}}
    actionTitle={"Create"}
    />
  {isSuccess&&<AlertSuccess />}
  </>)
 

};


export default RequestAsEmployee;
