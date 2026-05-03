
import Tables from "../Tables";

function MyMessage() {

  return (
    <>
      <Tables
        edit={(e: any) => {}}
        tableNumber={2}
        create={() => {}}
        deleteItem={(e: any) => {}}
        endPoint="SendMessage/getMyMessage"
        title=" الرسائل الواردة"
        disableDelete
        disableEdit
        disableCreate
        accessKeys={[
          { title: "عنوان الرسالة", key: "name", is_image: false, name: "name", email: null },
        
        ]}
      />

    </>
  );
};

export default MyMessage;