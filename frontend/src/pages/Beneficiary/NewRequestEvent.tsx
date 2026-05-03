import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDisableSearch } from "../../store/slice/search/search";
import CreateDialog from "../Form/FormDialog/CreateDialog";
import Tables from "../Tables";
import AlertSuccess from "../UiElements/AlertSuccess";
import { useGetQueryApiQuery } from "../../store/Apis/Queries/queriesSlice";
import LoaderTow from "../../common/Loader/LoaderTow";
import { useNavigate } from "react-router-dom";





var deleteSelected = "";
const NewRequestEvent = () => {
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
  ])
  const [edit,setEdit]=useState(create);
  const [openEdit, setOpenEdit] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const nav=useNavigate();
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



 

  const handleCloseCreate = () => {
    setOpenCreate(false);
    setIsSuccess(true);
    nav("/dash")
  };
  useEffect(()=>{
   if (!isLoading) {
    
    create[1].option=data.category.map((item:{_id:string,name:string}) => ({ id: item._id, name: item.name }))
        console.log(create);
   }
  },[isLoading])
  if (isLoading) {
   return <div className="flex justify-center h-[70vh]"><LoaderTow/></div>
  }
 
  return (
      <CreateDialog
        data={create}
        title="Create Event"
        endPoint="Event/createFromOwner"
        onClose={() => handleCloseCreate()}
        actionTitle={"Create"}
      />
    );
 
};

export default NewRequestEvent;