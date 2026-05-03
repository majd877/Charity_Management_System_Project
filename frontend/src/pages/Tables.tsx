import ReactPaginate from "react-paginate";
import TableThree from "../components/Tables/ActiveTables/TableThree";
import { useGetQueryApiQuery } from "../store/Apis/Queries/queriesSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import TableOne from "../components/Tables/ActiveTables/TableOne";
import Cookies from 'js-cookie';
import { useParams, useSearchParams } from "react-router-dom";

interface TableProps {
  endPoint: string;
  title: string;
  tableNumber: number;
  create: () => void;
  edit: (item: any) => void;
  deleteItem: (item: any) => void;
  disableCreate?: boolean;
  disableEdit?:boolean;
  disableDelete?:boolean;
  accessKeys: Array<any>;
  linkto?:{
    path:string,
    isUser:boolean
  };
}

const Tables: React.FC<TableProps> = ({
  endPoint,
  title,
  tableNumber,
  create,
  edit,
  deleteItem,
  accessKeys,
  linkto,
  disableCreate,
  disableEdit,
  disableDelete,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = useSelector((state: any) => state.search);
  const param = useParams();

  const { data, isLoading, isError, refetch } = useGetQueryApiQuery({
    name: endPoint,
    ajax: `page=${searchParams.get("page") || 1}&paginate=${searchParams.get("paginate") || 5}&search=${search.page}`,
  });

  useEffect(() => {
    refetch();
  }, [searchParams, param, search, refetch]);
 
  const handlePageClick = (e: { selected: number }) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("page", (e.selected + 1).toString());
      return newParams;
    });
  };

  const handlePaginateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("paginate", e.target.value);
      newParams.set("page", "1"); // Reset to page 1 when paginate changes
      return newParams;
    });
  };

  if (isError) {
    Cookies.remove("authToken");
    window.location.reload();
  }

  const renderTable = () => {
    const tableProps = {
      accessKeys,
      loading: isLoading || isError,
      data: data?.data?.data,
      edit,
      linkto: linkto,
      handleDelete: deleteItem,
      disableEdit: disableEdit,
      disableDelete: disableDelete,
    };

    return tableNumber === 1 ? (
      <TableThree data={tableProps} />
    ) : (
      <TableOne data={tableProps} />
    );
  };

  return (
    <>
      <h4 className="mb-6 flex justify-between text-xl font-semibold text-black dark:text-white">
        <span>{title}</span>
        {!disableCreate && (
          <button onClick={create}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 fill-black dark:fill-white"
              viewBox="0 -960 960 960"
              fill="#434343"
            >
              <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
          </button>
        )}
      </h4>

      <div className="flex flex-col gap-10">
        {data?.data?.data?.length === 0 ? (
          <div className="h-[22vw] flex items-center justify-center">
            <h1 className="text-black dark:text-white text-center text-xl">
             لا يوجد بيانات
            </h1>
          </div>
        ) : (
          renderTable()
        )}
      </div>

      {data?.data?.pages > 1 && (
        <div className="rounded-sm py-2 flex justify-between items-center bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <ReactPaginate
            className="flex w-full justify-around select-none"
            breakLabel="..."
            nextLabel="الصفحة التالية >"
            onPageChange={handlePageClick}
            pageCount={data?.data?.pages}
            previousLabel="< الصفحة السابقة"
            renderOnZeroPageCount={null}
            activeClassName="dark:text-white text-primary"
            disabledClassName="cursor-not-allowed"
            forcePage={parseInt(searchParams.get("page")||"1")-1}
          />
          <select
            value={searchParams.get("paginate") || 5}
            onChange={handlePaginateChange}
            className="text-center bg-transparent px-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
          >
            {[5, 20, 100, 500].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default Tables;
