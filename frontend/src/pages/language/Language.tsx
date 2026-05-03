import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeDisableSearch } from "../../store/slice/search/search";
import CreateDialog from "../Form/FormDialog/CreateDialog";
import Tables from "../Tables";
import AlertSuccess from "../UiElements/AlertSuccess";

let create:any=[
 {   
  type:"select",
  title:"name",
  name:"name",
  option: [
      { id: "English", name: "English" },
      { id: "Chinese", name: "Chinese" },
      { id: "Spanish", name: "Spanish" },
      { id: "Hindi", name: "Hindi" },
      { id: "Bengali", name: "Bengali" },
      { id: "Portuguese", name: "Portuguese" },
      { id: "Russian", name: "Russian" },
      { id: "Japanese", name: "Japanese" },
      { id: "German", name: "German" },
      { id: "French", name: "French" },
      { id: "Italian", name: "Italian" },
      { id: "Korean", name: "Korean" },
      { id: "Turkish", name: "Turkish" },
      { id: "Vietnamese", name: "Vietnamese" },
      { id: "Urdu", name: "Urdu" },
      { id: "Persian", name: "Persian" },
      { id: "Swahili", name: "Swahili" },
      { id: "Tamil", name: "Tamil" },
      { id: "Dutch", name: "Dutch" }
  ]
  ,
  required:true, 
  defaultValue:undefined 
 },

]
let edit:any=[
  {   
   type:"select",
   title:"name",
   name:"name",
   option: [
       { id: "English", name: "English" },
       { id: "Chinese", name: "Chinese" },
       { id: "Spanish", name: "Spanish" },
       { id: "Hindi", name: "Hindi" },
       { id: "Bengali", name: "Bengali" },
       { id: "Portuguese", name: "Portuguese" },
       { id: "Russian", name: "Russian" },
       { id: "Japanese", name: "Japanese" },
       { id: "German", name: "German" },
       { id: "French", name: "French" },
       { id: "Italian", name: "Italian" },
       { id: "Korean", name: "Korean" },
       { id: "Turkish", name: "Turkish" },
       { id: "Vietnamese", name: "Vietnamese" },
       { id: "Urdu", name: "Urdu" },
       { id: "Persian", name: "Persian" },
       { id: "Swahili", name: "Swahili" },
       { id: "Tamil", name: "Tamil" },
       { id: "Dutch", name: "Dutch" }
   ]
   ,
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
  
 ]
var deleteSelected="";
const Language = () => {
  const [openCreate,setOpenCreate]=useState(false);
  const [openEdit, setOpenEdit] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispach=useDispatch();
  const handleEdit=(e:any)=>{
    setOpenEdit(e._id);

    edit[0].defaultValue = e.name;
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
    title="create Language"
    endPoint="Language/create"
    onClose={()=>{handleCloseCreate()}}
    actionTitle={"Create"}
    />
  }
  if (openDelete!=null) {
    return  <CreateDialog
    data={[]}
    title={`Delete Language ${deleteSelected}`}
    endPoint={`Language/delete/${openDelete}`}
    onClose={()=>{handleCloseDelete()}}
    actionTitle={"Delete"}
    />
  }
  if (openEdit !== null) {

    return (
      <CreateDialog
        data={edit}
        title="Edit Language"
        endPoint={`Language/update/${openEdit}`}
        onClose={()=>{handleCloseEdit()}}
        actionTitle="Edit"
      />
    );
  }

  return (
    <>
      <Tables
      disableCreate={false}
      disableDelete={true}
      disableEdit={true}
        edit={(e: any) => handleEdit(e)}
        tableNumber={2}
        create={() => setOpenCreate(true)}
        deleteItem={(e:any)=>{handleDelete(e)}}
        endPoint="Language/get"
        title="Language"
        accessKeys={[
          { title: 'name',key: 'name',is_iamge:false },
          
        ]}
      />
      
      {isSuccess&&<AlertSuccess />}
    </>
  );
};
export default Language;
