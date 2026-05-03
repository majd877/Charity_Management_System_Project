import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDisableSearch } from "../../store/slice/search/search";
import CreateDialog from "../Form/FormDialog/CreateDialog";
import Tables from "../Tables";
import AlertSuccess from "../UiElements/AlertSuccess";
const MyList = () => {

  return (
    <>
      <Tables
        disableCreate={true}
        disableDelete
        disableEdit
        edit={(e: any) => {}}
        tableNumber={2}
        create={() => {}}
        deleteItem={(e: any) => {}}
        endPoint="Action/getWhatIBide"
        title="قوائم التبرعات"
        accessKeys={[
          { title: "الحدث", key: "event.name", is_image: false, name: "الاسم" },
          { title: "الحالة", key: "req_status", is_image: false, name: "status" },
          { title: "المبلغ", key: "price", is_image: false, name: "status" },
          { title: "تاريخ الطلب", key: "createdAt", is_image: false, name: "status" },
        ]}
      />

      
    </>
  );
};

export default MyList;