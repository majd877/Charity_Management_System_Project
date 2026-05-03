import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDisableSearch } from "../../store/slice/search/search";
import CreateDialog from "../Form/FormDialog/CreateDialog";
import Tables from "../Tables";
import AlertSuccess from "../UiElements/AlertSuccess";
import { useGetQueryApiQuery } from "../../store/Apis/Queries/queriesSlice";
import LoaderTow from "../../common/Loader/LoaderTow";




var deleteSelected = "";
const Event = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [create,setCreate]=useState<any[]>([
    {
      type: "upload",
      title: "image",
      name: "image",
      defaultValue: undefined,
    },
    
    {
     type: "select",
     title: "نوع الفعالية",
     name: "category",
     option:[],
     defaultValue: undefined,
   },
    {
     type: "select",
     title: "المستفيد",
     name: "beneficiary",
     option:[],
     defaultValue: undefined,
   },
    {
     type: "select",
     title: "حالة الطلب",
     name: "req_status",
     option:[
      {id:"في حالة الانتظار",name:"في حالة الانتظار"},
      {id:"تتم الدراسة",name:"تتم الدراسة"},
      {id:"مقبولة",name:"مقبولة"},
      {id:"مرفوضة",name:"مرفوضة"},

     ],
     defaultValue: undefined,
   },
    {
      type: "text",
      title: "عنوان الطلب",
      name: "name",
      required: true,
      defaultValue: undefined,
    },
    {
      type: "textArea",
      title: "وصف الطلب",
      name: "description",
      required: true,
      defaultValue: undefined,
    },
     {
      type: "textArea",
      title: "ملاحظات على الطلب",
      name: "note",
      required: false,
      defaultValue: undefined,
    },
     {
      type: "checkBox",
      title: "هل هو مستعجل؟",
      name: "is_faster",
      defaultValue: undefined,
    },
    {
      type: "checkBox",
      title: "تفعيل",
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
    name: "Event/getName",
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
    
    create[1].option=data.category.map((item:{_id:string,name:string}) => ({ id: item._id, name: item.name }))
        console.log(create);
     create[2].option=data.beneficiary.map((item:{_id:string,name:string}) => ({ id: item._id, name: item.name }))
   }
  },[isLoading])
  if (isLoading) {
   return <div className="flex justify-center h-[70vh]"><LoaderTow/></div>
  }
 
  if (openCreate) {
    return (
      <CreateDialog
        data={create}
        title="Create Event"
        endPoint="Event/create"
        onClose={() => handleCloseCreate()}
        actionTitle={"Create"}
      />
    );
  }
  if (openDelete !== null) {
    return (
      <CreateDialog
        data={[]}
        title={`Delete Event ${deleteSelected}`}
        endPoint={`Event/delete/${openDelete}`}
        onClose={() => handleCloseDelete()}
        actionTitle={"Delete"}
      />
    );
  }

  if (openEdit !== null) {
    return (
      <CreateDialog
        data={edit}
        title="Edit Event"
        endPoint={`Event/update/${openEdit}`}
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
        endPoint="Event/get"
        title="الفعاليات"
        accessKeys={[
          { title: "الفعالية", key: "image", is_image: true, name: "name", email: null },
          { title: "حالة الطلب", key: "req_status", is_image: false, name: "req_status" },
          { title: "المستفيد", key: "user.name", is_image: false, name: "status" },
          { title: "status", key: "status", is_image: false, name: "status" },
        ]}
      />

      {isSuccess && <AlertSuccess />}
    </>
  );
};

export default Event;