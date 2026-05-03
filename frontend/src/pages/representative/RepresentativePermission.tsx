import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDisableSearch } from "../../store/slice/search/search";
import CreateDialog from "../Form/FormDialog/CreateDialog";
import Tables from "../Tables";
import AlertSuccess from "../UiElements/AlertSuccess";
import { useGetQueryApiQuery } from "../../store/Apis/Queries/queriesSlice";
import LoaderTow from "../../common/Loader/LoaderTow";

type PermissionItem = {
  type: "checkBox";
  title: string;     // Arabic label
  name: string;      // permission key (e.g. "category")
  defaultValue?: boolean;
};

const RepresentativePermission = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [edit, setEdit] = useState<PermissionItem[]>([]);
  const [openEdit, setOpenEdit] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.keyWord.language);

  // Fetch all available permissions (catalog)
  const { data, isLoading, isError, refetch } = useGetQueryApiQuery({
    name: "Permission/get",
  });

  // Build the checkbox schema once we have the catalog
  useEffect(() => {
    if (!data?.data?.data) return;
    const role = data.data.data as Array<{ name: string; to: string }>;
    const roleData: PermissionItem[] = role.map((p) => ({
      type: "checkBox",
      title: p.name,
      name: p.to,
      defaultValue: false, // will be set when opening Edit
    }));
    setEdit(roleData);
  }, [data]);

  // Enable search; show success toast controlled by state instead of DOM pokes
  useEffect(() => {
    dispatch(changeDisableSearch(false));
  }, [dispatch]);

  const handleEdit = (row: any) => {
    // row is the selected representative from the table
    setOpenEdit(row.user._id as string);
   console.log(row);
   
    const currentPerms: string[] = Array.isArray(row.user?.permission)
      ? row.user.permission
      : [];

    // Map schema + mark which boxes are checked for this rep
    const prepared = edit.map((item) => ({
      ...item,
      defaultValue: currentPerms.includes(item.name),
    }));

    setEdit(prepared);
  };

  const handleDelete = (row: any) => {
    setOpenDelete(row._id as string);
    // do your delete flow here (not implemented in original snippet)
  };

  const handleCloseEdit = () => {
    setOpenEdit(null);
    setIsSuccess(true);
    // optionally refetch representatives after a successful save in CreateDialog
    // refetch();
    setTimeout(() => setIsSuccess(false), 6000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center h-[70vh]">
        <LoaderTow />
      </div>
    );
  }

  if (openEdit !== null) {
    // IMPORTANT: point to your representative update endpoint
    // (adjust to whatever your backend expects to update permissions)
    return (
      <CreateDialog
        data={edit}
        title="تعديل صلاحيات الموظف"
        endPoint={`Representative/RepresentativePermission/${openEdit}`}
        onClose={handleCloseEdit}
        actionTitle="تعديل"
      />
    );
  }

  return (
    <>
      <Tables
        disableCreate
        disableDelete
        edit={(row: any) => handleEdit(row)}
        tableNumber={2}
        create={() => setOpenCreate(true)}
        deleteItem={(row: any) => handleDelete(row)}
        endPoint="Representative/get"
        title="صلاحيات الموظفين"
        accessKeys={[
          {
            title: "Representative",
            key: "image",
            is_image: true,
            name: "user.name",
            email: "user.email",
          },
            // Keep unique columns only
          { title: "phone", key: "phone", is_image: false },
          { title: "salary", key: "salary", is_image: false },
        ]}
      />

      {isSuccess && <AlertSuccess />}
    </>
  );
};

export default RepresentativePermission;
