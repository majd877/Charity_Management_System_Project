import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDisableSearch } from "../../store/slice/search/search";
import CreateDialog from "../Form/FormDialog/CreateDialog";
import Tables from "../Tables";
import AlertSuccess from "../UiElements/AlertSuccess";
import { useGetQueryApiQuery } from "../../store/Apis/Queries/queriesSlice";
import LoaderTow from "../../common/Loader/LoaderTow";





var deleteSelected = "";
const Action = () => {
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
     title: "نوع التبرع",
     name: "category",
     option:[],
     defaultValue: undefined,
   },
     {
     type: "select",
     title: "المتبرع",
     name: "donors",
     option:[],
     defaultValue: undefined,
   },
    {
     type: "select",
     title: "الفعالية",
     name: "event",
     option:[],
     defaultValue: undefined,
   },
   {
      type: "number",
     title: "القيمة المالية",
     name: "price",
     min:1,
     required:true,
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
      type: "textArea",
      title: "ملاحظات على الطلب",
      name: "note",
      required: false,
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
    name: "Action/getName",
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
  
    
    const newArray = create.map((item:any) => {
      let defaultValue: any = e[item.name] || null;
   if (item.name=="category") {
        defaultValue=e.category._id
       }
      else if (item.name=="donors") {
        defaultValue=e.user._id
       }
         else if (item.name=="event") {
        defaultValue=e.event._id
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
    console.log(data.data);
    
    create[1].option=data.category.map((item:{_id:string,name:string}) => ({ id: item._id, name: item.name }))
        console.log(create);
     create[2].option=data.donors.map((item:{_id:string,name:string}) => ({ id: item._id, name: item.name }))
     create[3].option=data.event.map((item:{_id:string,name:string}) => ({ id: item._id, name: item.name }))
   }
  },[isLoading])
  if (isLoading) {
   return <div className="flex justify-center h-[70vh]"><LoaderTow/></div>
  }
 
  if (openCreate) {
    return (
      <CreateDialog
        data={create}
        title="Create Action"
        endPoint="Action/create"
        onClose={() => handleCloseCreate()}
        actionTitle={"Create"}
      />
    );
  }
  if (openDelete !== null) {
    return (
      <CreateDialog
        data={[]}
        title={`Delete Action ${deleteSelected}`}
        endPoint={`Action/delete/${openDelete}`}
        onClose={() => handleCloseDelete()}
        actionTitle={"Delete"}
      />
    );
  }

  if (openEdit !== null) {
    return (
      <CreateDialog
        data={edit}
        title="Edit Action"
        endPoint={`Action/update/${openEdit}`}
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
        endPoint="Action/get"
        title="قوائم التبرعات"
        accessKeys={[
          { title: "الفعالية", key: "image", is_image: true, name: "event.name", email: null },
          { title: "نوع التبرع", key: "category.name", is_image: false, name: "status" },
          { title: "القيمة المالية", key: "price", is_image: false, name: "status" },
          { title: "حالة الطلب", key: "req_status", is_image: false, name: "req_status" },
          { title: "المتبرع", key: "user.name", is_image: false, name: "status" },
        ]}
      />

      {isSuccess && <AlertSuccess />}
    </>
  );
};

export default Action;