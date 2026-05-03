import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDisableSearch } from "../../store/slice/search/search";
import CreateDialog from "../Form/FormDialog/CreateDialog";
import Tables from "../Tables";
import AlertSuccess from "../UiElements/AlertSuccess";
import { useGetQueryApiQuery } from "../../store/Apis/Queries/queriesSlice";
import LoaderTow from "../../common/Loader/LoaderTow";





var deleteSelected = "";
const Brand = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [create,setCreate]=useState<any[]>([
    {
      type: "upload",
      title: "image",
      name: "image",
      defaultValue: undefined,
    },
    {
     type: "selectMany",
     title: "category",
     name: "category",
     option:[],
     defaultValue: undefined,
   },
    {
      type: "text",
      title: "name",
      name: "name",
      required: true,
      defaultValue: undefined,
    },
    {
      type: "textArea",
      title: "description",
      name: "description",
      required: true,
      defaultValue: undefined,
    },
    {
      type: "text",
      title: "seo name",
      name: "seo_name",
      defaultValue: undefined,
    },
    {
      type: "text",
      title: "seo description",
      name: "seo_description",
      defaultValue: undefined,
    },
    {
      type: "text",
      title: "seo keywords",
      name: "seo_keywords",
      defaultValue: undefined,
    },
    {
      type: "text",
      title: "slug",
      name: "slug",
      defaultValue: undefined,
    },
    {
      type: "text",
      title: "og title",
      name: "og_title",
      defaultValue: undefined,
    },
    {
      type: "text",
      title: "og Description",
      name: "og_description",
      defaultValue: undefined,
    },
    
    
    
    
    
    
    {
      type: "text",  
      title: "twitter title",
      name: "twitter_title",
      defaultValue: undefined,
    },
    {
      type: "text",  
      title: "twitter description",
      name: "twitter_description",
      defaultValue: undefined,
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
    name: "category/getName",
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
  
      
      if (item.type === "upload") {
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
    
    create[1].option=data.data.map((item:{_id:string,name:string}) => ({ id: item._id, name: item.name }))
        console.log(create);
        
   }
  },[isLoading])
  if (isLoading) {
   return <div className="flex justify-center h-[70vh]"><LoaderTow/></div>
  }
 
  if (openCreate) {
    return (
      <CreateDialog
        data={create}
        title="Create Brand"
        endPoint="Brand/create"
        onClose={() => handleCloseCreate()}
        actionTitle={"Create"}
      />
    );
  }
  if (openDelete !== null) {
    return (
      <CreateDialog
        data={[]}
        title={`Delete Brand ${deleteSelected}`}
        endPoint={`Brand/delete/${openDelete}`}
        onClose={() => handleCloseDelete()}
        actionTitle={"Delete"}
      />
    );
  }

  if (openEdit !== null) {
    return (
      <CreateDialog
        data={edit}
        title="Edit Brand"
        endPoint={`Brand/update/${openEdit}`}
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
        endPoint="Brand/get"
        title="Brand"
        accessKeys={[
          { title: "Representative", key: "image", is_image: true, name: "name", email: null },
          { title: "status", key: "status", is_image: false, name: "status" },
        ]}
      />

      {isSuccess && <AlertSuccess />}
    </>
  );
};

export default Brand;