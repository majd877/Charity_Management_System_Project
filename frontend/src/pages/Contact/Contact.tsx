import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDisableSearch } from "../../store/slice/search/search";
import CreateDialog from "../Form/FormDialog/CreateDialog";
import Tables from "../Tables";
import AlertSuccess from "../UiElements/AlertSuccess";

let create:any=[
 {   
  type:"upload",
  title:"image",
  name:"file",
  defaultValue:undefined ,
  required:true, 
},
 {   
  type:"url",
  title:"url",
  name:"url",
  required:true, 
  defaultValue:undefined 
 },
 {   
  type:"checkBox",
  title:"status",
  name:"status",
  defaultValue:undefined 
 },
]
let edit:any=[
  {   
    type:"upload",
    title:"image",
    name:"file",
    defaultValue:undefined 
  },
  {   
   type:"url",
   title:"url",
   name:"url",
   required:true, 
   defaultValue:undefined 
  },

   {   
    type:"checkBox",
    title:"status",
    name:"status",
    defaultValue:undefined 
   },
 ]
var deleteSelected="";
const Contact = () => {
  const [openCreate,setOpenCreate]=useState(false);
  const [openEdit, setOpenEdit] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispach=useDispatch();
  const selector=useSelector((state:any)=>state.keyWord.language);

  const handleEdit=(e:any)=>{
    setOpenEdit(e._id);
    edit[0].defaultValue = e.image;
    edit[1].defaultValue = e.url;
    edit[2].defaultValue = e.status;
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
    title="create Contact"
    endPoint="Contact/create"
    onClose={()=>{handleCloseCreate()}}
    actionTitle={"Create"}
    />
  }
  if (openDelete!=null) {
    return  <CreateDialog
    data={[]}
    title={`Delete Contact ${deleteSelected}`}
    endPoint={`Contact/delete/${openDelete}`}
    onClose={()=>{handleCloseDelete()}}
    actionTitle={"Delete"}
    />
  }
  if (openEdit !== null) {

    return (
      <CreateDialog
        data={edit}
        title="Edit Contact"
        endPoint={`Contact/update/${openEdit}`}
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
        endPoint="Contact/get"
        title="Contact"
        accessKeys={[
          { title: 'Representative',key:"image",is_image:true,name:"name",email:null },
          { title: 'status',key:"status",is_image:false,name:"status" },
          
        ]}
      />
      
      {isSuccess&&<AlertSuccess />}
    </>
  );
};


export default Contact;
