import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDisableSearch } from "../../store/slice/search/search";
import CreateDialog from "../Form/FormDialog/CreateDialog";
import Tables from "../Tables";
import AlertSuccess from "../UiElements/AlertSuccess";
import { useGetQueryApiQuery } from "../../store/Apis/Queries/queriesSlice";
import LoaderTow from "../../common/Loader/LoaderTow";





var deleteSelected = "";
const SendMessageDoubtTow = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [create,setCreate]=useState<any[]>([
 
    {
     type: "select",
     title: "المستفيد",
     name: "user_id",
     option:[],
     defaultValue: undefined,
   },
  
    {
      type: "text",
      title: "عنوان الرسالة",
      name: "name",
      required: true,
      defaultValue: undefined,
    },
    {
      type: "textArea",
      title: "محتوى الرسالة",
      name: "description",
      required: true,
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
    name: "sendMessageDoubt/getBeneficiary",
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
   console.log('====================================');
   console.log(e);
   console.log('====================================');
    
    const newArray = create.map((item:any) => {
      let defaultValue: any = e[item.name] || null;
   if (item.name=="category") {
        defaultValue=e.category._id
       }
      else if (item.name=="beneficiary") {
        defaultValue=e.user._id
       }
      
      
     else if (item.type === "upload") {
        defaultValue = e[item.name] || null;
      } else if (item.type === "uploadMany") {
        defaultValue = e["fileUrls"] || []; 
      } else if (item.type === "text" || item.type === "textArea") {
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
    
    
     create[0].option=data.beneficiary.map((item:{_id:string,name:string}) => ({ id: item._id, name: item.name }))
   }
  },[isLoading])
  if (isLoading) {
   return <div className="flex justify-center h-[70vh]"><LoaderTow/></div>
  }
 
  if (openCreate) {
    return (
      <CreateDialog
        data={create}
        title="Create sendMessageDoubt"
        endPoint="sendMessageDoubt/create/beneficiary"
        onClose={() => handleCloseCreate()}
        actionTitle={"Create"}
      />
    );
  }
  if (openDelete !== null) {
    return (
      <CreateDialog
        data={[]}
        title={`Delete sendMessageDoubt ${deleteSelected}`}
        endPoint={`sendMessageDoubt/delete/${openDelete}`}
        onClose={() => handleCloseDelete()}
        actionTitle={"Delete"}
      />
    );
  }

  if (openEdit !== null) {
    return (
      <CreateDialog
        data={edit}
        title="Edit sendMessageDoubt"
        endPoint={`sendMessageDoubt/update/${openEdit}`}
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
        endPoint="sendMessageDoubt/getMyMessage"
        title="شكاوي المتبرعين"
        accessKeys={[
          { title: "المستفيد", key: "user.name", is_image: false, name: "status" },
          { title: "عنوان الرسالة", key: "name", is_image: false, name: "status" },
        ]}
      />

      {isSuccess && <AlertSuccess />}
    </>
  );
};

export default SendMessageDoubtTow;