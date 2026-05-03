import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDisableSearch } from "../../store/slice/search/search";
import CreateDialog from "../Form/FormDialog/CreateDialog";
import Tables from "../Tables";
import AlertSuccess from "../UiElements/AlertSuccess";





var deleteSelected = "";
const Category = () => {
  const [create,setCreate]=useState<any[]>( [
  
    {
      type: "text",
      title: "name",
      name: "name",
      required: true,
      defaultValue: undefined,
    },
    {
      type: "checkBox",
      title: "status",
      name: "status",
      defaultValue: undefined,
    },
  ])
  const [openCreate, setOpenCreate] = useState(false);
  const [edit,setEdit]=useState(create);
  const [openEdit, setOpenEdit] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.keyWord.language);

  
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
      } else if (item.type === "text" || item.type === "textArea"||item.type=="select") {
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
    console.log('====================================');
    console.log(create);
    console.log('====================================');
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

  if (openCreate) {
    return (
      <CreateDialog
        data={create}
        title="Create Category"
        endPoint="Category/create"
        onClose={() => handleCloseCreate()}
        actionTitle={"Create"}
      />
    );
  }
  if (openDelete !== null) {
    return (
      <CreateDialog
        data={[]}
        title={`Delete Category ${deleteSelected}`}
        endPoint={`Category/delete/${openDelete}`}
        onClose={() => handleCloseDelete()}
        actionTitle={"Delete"}
      />
    );
  }

  if (openEdit !== null) {
    return (
      <CreateDialog
        data={edit}
        title="Edit Category"
        endPoint={`Category/update/${openEdit}`}
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
        endPoint="Category/get"
        title="تصنيفات التبرعات"
        accessKeys={[
          { title: "الاسم", key: "name", is_image: false, name: "الاسم" },
          { title: "الحالة", key: "status", is_image: false, name: "status" },
        ]}
      />

      {isSuccess && <AlertSuccess />}
    </>
  );
};

export default Category;