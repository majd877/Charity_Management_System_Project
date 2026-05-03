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
  defaultValue:undefined 
},
 {   
  type:"text",
  title:"name",
  name:"name",
  required:true, 
  defaultValue:undefined 
 },

 {   
  type:"textArea",
  title:"description",
  name:"description",
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
    type:"text",
    title:"name",
    name:"name",
    defaultValue:undefined 
   },
  
   {   
    type:"textArea",
    title:"description",
    name:"description",
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
const Pages = () => {
  const [openCreate,setOpenCreate]=useState(false);
  const [openEdit, setOpenEdit] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispach=useDispatch();
  const selector=useSelector((state:any)=>state.keyWord.language);

  const handleEdit=(e:any)=>{
    setOpenEdit(e._id);
    edit[0].defaultValue = e.image;
    edit[1].defaultValue = e.name;
    edit[2].defaultValue = e.description;
    edit[3].defaultValue = e.status;
    selector.forEach((item: string,index:number) => {
      const multiLangValue = e["name_" + item] || null;  
      edit[index+4]={
        name:"name_" + "_" + item,
        title: "name " + " " + item,
        type: "text",
        required: false,
        defaultValue: multiLangValue,
      };
    });
    selector.forEach((item: string,index:number) => {
      const multiLangValue = e["description_" + item] || null;  
      edit[index+4+selector.length]={
        name:"description" + "_" + item,
        title: "description " + " " + item,
        type: "textArea",
        required: false,
        defaultValue: multiLangValue,
      };
    });
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
    title="create Pages"
    endPoint="Pages/create"
    onClose={()=>{handleCloseCreate()}}
    actionTitle={"Create"}
    />
  }
  if (openDelete!=null) {
    return  <CreateDialog
    data={[]}
    title={`Delete Pages ${deleteSelected}`}
    endPoint={`Pages/delete/${openDelete}`}
    onClose={()=>{handleCloseDelete()}}
    actionTitle={"Delete"}
    />
  }
  if (openEdit !== null) {

    return (
      <CreateDialog
        data={edit}
        title="Edit Pages"
        endPoint={`Pages/update/${openEdit}`}
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
        endPoint="Pages/get"
        title="Pages"
        accessKeys={[
          { title: 'Representative',key:"image",is_image:true,name:"name",email:null },
          { title: 'status',key:"status",is_image:false,name:"status" },
          
        ]}
      />
      
      {isSuccess&&<AlertSuccess />}
    </>
  );
};


export default Pages;
