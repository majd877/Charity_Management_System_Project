import { useEffect, useState } from "react";
import CreateDialog from "../Form/FormDialog/CreateDialog";
import Tables from "../Tables";
import { useDispatch } from "react-redux";
import { changeDisableSearch } from "../../store/slice/search/search";
import AlertSuccess from "../UiElements/AlertSuccess";
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

 {   
  type:"checkBox",
  title:"الحالة",
  name:"status",
  defaultValue:undefined 
 },
]
let edit:any=[
  {   
   type:"upload",
   title:"الصورة",
   name:"file",
   defaultValue:undefined 
 },
  {   
   type:"text",
   title:"الاسم",
   name:"الاسم",
   defaultValue:undefined 
  },
  {   
   type:"email",
   title:"email",
   name:"email",
   defaultValue:undefined 
  },
  {   
   type:"password",
   title:"كلمة المرور",
   name:"password",
   defaultValue:undefined 
  },
  {   
   type:"number",
   title:"رقم الهاتف",
   name:"phone",
   defaultValue:undefined 
  },
  {   
   type:"number",
   title:"الراتب",
   name:"salary",
   defaultValue:undefined 
  },
  {   
   type:"textArea",
   title:"البيانات",
   name:"about",
   defaultValue:undefined 
  },

  {   
    type:"checkBox",
    title:"الحالة",
    name:"status",
    defaultValue:undefined 
   },
 ]
var deleteSelected="";
const Representative = () => {
  const [openCreate,setOpenCreate]=useState(false);
  const [openEdit, setOpenEdit] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispach=useDispatch();
  const handleEdit=(e:any)=>{
    setOpenEdit(e._id);

    edit[0].defaultValue = e.image;
    edit[1].defaultValue = e.user.name;
    edit[2].defaultValue = e.user.email;
    edit[4].defaultValue = e.phone;
    edit[5].defaultValue = e.salary;
    edit[6].defaultValue = e.about;
    edit[7].defaultValue = { latitude: parseFloat(e.user.latitude), longitude: parseFloat(e.user.longitude) };
    edit[8].defaultValue = e.user.status;
  }
  useEffect(()=>{
    dispach(changeDisableSearch(false))  
    const element = document.getElementById("showSussess")as HTMLInputElement;
    
    if (element) {
      element.style.display = "block";
    }
    setTimeout(() => {
      setIsSuccess(false)
    }, 6000);

  },[openCreate,openEdit,openCreate])
  const handleDelete=(e:any)=>{
    setOpenDelete(e._id)
    deleteSelected=e.currency;
  }
 
 
  const handleCloseEdit = () => {
    setOpenEdit(null); // Reset to null on close
    setIsSuccess(true)
  
  };
  const handleCloseDelete= () => {
    setOpenDelete(null); // Reset to null on close
    setIsSuccess(true)
  
  };
  const handleCloseCreate= () => {
    setOpenCreate(false); // Reset to null on close
    setIsSuccess(true)
  
  };
 
  if (openCreate) {
    return <CreateDialog
    data={create}
    title="create representative"
    endPoint="representative/create"
    onClose={()=>{handleCloseCreate()}}
    actionTitle={"Create"}
    />
  }
  if (openDelete!=null) {
    return  <CreateDialog
    data={[]}
    title={`Delete representative ${deleteSelected}`}
    endPoint={`representative/delete/${openDelete}`}
    onClose={()=>{handleCloseDelete()}}
    actionTitle={"Delete"}
    />
  }
  if (openEdit !== null) {

    return (
      <CreateDialog
        data={edit}
        title="Edit representative"
        endPoint={`representative/update/${openEdit}`}
        onClose={()=>{handleCloseEdit()}}
        actionTitle="Edit"
      />
    );
  }

  return (
    <>
      <Tables
      disableCreate={false}
        edit={(e: any) => handleEdit(e)}
        tableNumber={2}
        create={() => setOpenCreate(true)}
        deleteItem={(e:any)=>{handleDelete(e)}}
        endPoint="representative/get"
        title="Representative"
       
        accessKeys={[
         { title: 'Representative',key:"image",is_image:true,name:"user.name",email:"user.email" },
          { title: 'phone',key: 'phone',is_iamge:false },
          { title: 'salary',key: 'salary',is_iamge:false },
          { title: 'status',key:"user.status",is_image:false },
        ]}
      />
      
      {isSuccess&&<AlertSuccess />}
    </>
  );
};


export default Representative;
