import { useNavigate } from "react-router-dom";
import TableLoader from "../../../common/Loader/TableLoader";
import moment from "moment";
import { useRef, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { useReactToPrint } from "react-to-print";

import "primereact/resources/themes/lara-light-cyan/theme.css";
interface AccessKey {
  key: string;
  title: string;
  is_image?: boolean;
  name?: string;
  email?: string;
}

interface TableData {
  data: {
    accessKeys: AccessKey[];
    data: Array<Record<string, any>>;
    loading: boolean;
    edit: (item: any) => void;
    linkto?: {
      path:string,
      isUser:boolean
    };
    handleDelete: (item: any) => void;
    disableEdit?: boolean;
    disableDelete?: boolean;
  };
}

const TableOne = ({ data }: TableData) => {
  const nav = useNavigate();

  const renderContent = (data:any) => {
    if (Array.isArray(data)) {
      // إذا كانت القيمة مصفوفة، نقوم بتكرارها
      return (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{renderContent(item)}</li>
          ))}
        </ul>
      );
    } else if (typeof data === "object" && data !== null) {
      // إذا كانت القيمة كائنًا، نكرر المفاتيح والقيم داخله مع استثناء المفاتيح المطلوبة
      return (
        <div>
         {Object.entries(data)
  .filter(([key]) => 
    !["__v", "user_id", "password", "latitude", "inputs", "longitude"]
      .includes(key) && !key.includes("_") // استثناء أي مفتاح يحتوي على "_id"
  )
  .map(([key, value]) => (
              <div key={key} style={{ marginLeft: "20px" }}>
                <h2 className="text-center text-xl text-primary">{key} </h2>
                <hr />

                {renderContent(value)}
                <hr />
              </div>
            ))}
        </div>
      );
    }
    else if (typeof data === "string" && data.includes("<") && data.includes(">")) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: data }}
        />
      );
    }
     else if (typeof data === "string") {
      // إذا كانت القيمة نصًا، تحقق إذا كانت صورة
      if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(data)) {
        return <div className="flex justify-center">
          <img src={import.meta.env.VITE_IMAGE_URL+data} alt="Dynamic Content" style={{ maxWidth: "100%" }} />
        </div>;
      }
      // عرض النصوص الأخرى كالمعتاد
      return <p>{data}</p>;
    } else {
      // إذا كانت القيمة رقمًا أو نوعًا آخر
      return <p>{String(data)}</p>;
    }
  };

  const getNestedValue = (obj: any, path: string) => {
    if (!path) return null;
  
    const value = path.split('.').reduce((acc:any, part:any) => acc && acc[part], obj);
   if (path=="createdAt") {
    return <> <p>{moment(value).format("YY:MM:DD")}</p>
        <p>{moment(value).format("hh:mm A")}</p>
    </> 
   }
    if (value == true || value == 1) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#75FB4C">
          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg>
      );
    } else if (value == false || value == 0) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323">
          <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg>
      );
    }
  
    return value;
  };
  const [visible,setVisible]=useState<any>(null)
  const contentRef = useRef<HTMLDivElement | null>(null);

const handlePrint = useReactToPrint({
  contentRef,                     // ✅ v3 way
  documentTitle: "table.pdf",
  pageStyle: `
    @page { size: A4; margin: 12mm; }
    @media print {
      .print-hidden { display: none !important; }
    }
  `,
});


  return (
    <div className="rounded-sm bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
     <Dialog header="SHOW DATA" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(null); }}>
     <div>
     <div>
      {visible && typeof visible === "object" ? (
        renderContent(visible)
      ) : (
        <p>No Data Available</p>
      )}
    </div>
</div>
</Dialog>
         <button
  onClick={handlePrint}
  className="mb-4 rounded bg-primary px-4 py-2 text-white print:hidden"
>
  طباعة PDF
</button>
      <div ref={contentRef} className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            
            <tr  className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="py-4  flex justify-center bg-primary px-4 font-medium items-center text-3xl text-white ">
                  *
                </th>
              {data.accessKeys.map((item) => (
                <th
                  key={item.key+Math.random()}
                  className="min-w-[220px] py-4 px-4 font-medium text-start text-black dark:text-white xl:pl-11"
                >
                  {item.title}
                </th>
              ))}
              {!data.disableDelete && !data.disableEdit && (
                <th className="py-4 px-4 print:hidden font-medium text-black text-start dark:text-white">
                  الحدث
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.loading ? (
              <TableLoader scop={data.accessKeys.length + 1} />
            ) : (
              data.data.map((packageItem, key) => (
                <tr  className="hover:bg-gray-3 dark:hover:bg-meta-4" key={key+Math.random()}>
                  <td 
                      className="border-b w-[22px] text-primary border-[#eee]  text-center dark:border-strokedark "
                      >
                    {key+1}
                  </td>
                  {data.accessKeys.map((accessKey) => (
                    <td
                    onClick={()=>{setVisible(packageItem)}}
                      key={accessKey.key+Math.random()}
                      className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11"
                    >
                      {accessKey.is_image ? (
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                          <img
                            className="w-[50px]"
                            src={`${import.meta.env.VITE_IMAGE_URL}${getNestedValue(
                              packageItem,
                              accessKey.key
                            )}`}
                            alt="item"
                          
                          />
                        <div>
                        <h1> {accessKey?.email?getNestedValue(packageItem,accessKey?.email):null}</h1>
                        <h1>{accessKey?.name?getNestedValue(packageItem,accessKey?.name):null}</h1>
                        </div>
                        </div>
                      ) : (
                        <h5 className="font-medium text-black dark:text-white">
                          {getNestedValue(packageItem, accessKey.key)}
                        </h5>
                      )}
                    </td>
                  ))}
                  {true&& (
                    <td className="border-b print:hidden border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        {data.linkto && (
                          <button
                            onClick={() => {
                              if (data.linkto?.isUser) {
                                nav(`/${data.linkto?.path}/${packageItem.user._id}/${packageItem.user.name}`)
                              }else{
                                nav(`/${data.linkto?.path}/${packageItem._id}`)
                              }
                            }}
                            className="hover:text-primary"
                          >
                             <svg
      className="fill-current"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      
    >
      <path
        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
        fill=""
      />
      <path 
        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
        fill=""
      />
    </svg>
                          </button>
                        )}
                        {!data.disableDelete && (
                          <button
                            onClick={() => data.handleDelete(packageItem)}
                            className="hover:text-primary"
                          >
                             <svg
      className="fill-current"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
        fill=""
      />
      <path
        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
        fill=""
      />
      <path
        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
        fill=""
      />
      <path
        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
        fill=""
      />
    </svg>
                          </button>
                        )}
                         {!data.disableEdit && (
                          <button
                            onClick={() => data.edit(packageItem)}
                            className="hover:text-primary"
                          >
                              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>

                          </button>
                        )}
                       
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOne;
