import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDisableSearch } from "../../store/slice/search/search";
import CreateDialog from "../Form/FormDialog/CreateDialog";
import Tables from "../Tables";
import AlertSuccess from "../UiElements/AlertSuccess";
import { useGetQueryApiQuery } from "../../store/Apis/Queries/queriesSlice";
import LoaderTow from "../../common/Loader/LoaderTow";





var deleteSelected = "";
const OrphanSponsorship = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [create,setCreate]=useState<any[]>([
    {
      type: "upload",
      title: "الصورة",
      name: "file",
      defaultValue: undefined,
    },
 
    {
      type: "text",
      title: " الاسم الثلاثي للطفل",
      name: "name",
      required: true,
      defaultValue: undefined,
    },
     {
      type: "text",
      title: "عنوان الطلب",
      name: "title",
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
  type:"number",
  title:"التكلفة المتوقعة",
  name:"price",
  required:true, 
  defaultValue:undefined 
 },
    {
      type: "checkBox",
      title: "status",
      name: "status",
      defaultValue: undefined,
    },
  ])
  const [edit,setEdit]=useState(create);
  const [openEdit, setOpenEdit] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.keyWord.language);
const { data, isLoading, isError, refetch } = useGetQueryApiQuery({
    name: "Category/getName",
  });
  
  useEffect(() => {
    const updatedCreate: any[] = [];
  
    create.forEach((item: any) => {
      updatedCreate.push(item);
      if (item.type === "text" || item.type === "textArea") {
        selector.forEach((language: string) => {
          updatedCreate.push({
            ...item,
            title: `${item.title} (${language})`,
            name: `${item.name}_${language}`,
            required: false,
          });
        });
      }
    });
  
    setCreate(updatedCreate);
  }, [selector]);
  

  const handleEdit = async (e: any) => {
    setOpenEdit(e._id);
     console.log(e);
    
    const newArray = create.map((item:any) => {
      let defaultValue: any = e[item.name] || null;

         if (item.t=="status") {
        defaultValue=e.user.status
       }
        else if (item.name=="file") {
        defaultValue=e.image
       }
      else {
        defaultValue = e[item.name] || null;
      }
      
      return {
        ...item,
        defaultValue: defaultValue,
      };
    });
  
    
    setEdit(newArray);
  };

  useEffect(() => {
    dispatch(changeDisableSearch(false));
    const element = document.getElementById("showSussess") as HTMLInputElement;

    if (element) {
      element.style.display = "block";
    }

    setTimeout(() => {
      setIsSuccess(false);
    }, 6000);
  }, [openCreate, openEdit, openDelete]);

  const handleDelete = (e: any) => {
    setOpenDelete(e._id);
    deleteSelected = e.currency;
  };

  const handleCloseEdit = () => {
    setEdit(create);
    setOpenEdit(null);
    setIsSuccess(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(null);
    setIsSuccess(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
    setIsSuccess(true);
  };
  useEffect(()=>{
   if (!isLoading) {
    
    create[1].option=data.data.map((item:{_id:string,name:string}) => ({ id: item._id, name: item.name }))
        
   }
  },[isLoading])
  if (isLoading) {
   return <div className="flex justify-center h-[70vh]"><LoaderTow/></div>
  }
 
  if (openCreate) {
    return (
      <CreateDialog
        data={create}
        title="Create OrphanSponsorship"
        endPoint="OrphanSponsorship/create"
        onClose={() => handleCloseCreate()}
        actionTitle={"Create"}
      />
    );
  }
  if (openDelete !== null) {
    return (
      <CreateDialog
        data={[]}
        title={`Delete OrphanSponsorship ${deleteSelected}`}
        endPoint={`OrphanSponsorship/delete/${openDelete}`}
        onClose={() => handleCloseDelete()}
        actionTitle={"Delete"}
      />
    );
  }

  if (openEdit !== null) {
    return (
      <CreateDialog
        data={edit}
        title="Edit OrphanSponsorship"
        endPoint={`OrphanSponsorship/update/${openEdit}`}
        onClose={() => handleCloseEdit()}
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
        deleteItem={(e: any) => handleDelete(e)}
        endPoint="OrphanSponsorship/get"
        title="كفالة يتيم"
       accessKeys={[
         { title: 'المقدم',key:"image",is_image:true,name:"name",email:"" },
         { title: 'العنوان',key:"title",is_image:false,name:"name" },
         { title: 'التكلفة المتوقعة',key:"price",is_image:false,name:"name" },
        ]}
      />

      {isSuccess && <AlertSuccess />}
    </>
  );
};

export default OrphanSponsorship;