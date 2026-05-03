type TableLoaderProps = {
 scop?: number;  // If scop is intended for future use
};

const TableLoader = ({ scop }: TableLoaderProps) => {
 return (
   <tr className="bg-gray-2 text-left dark:bg-meta-4">
     <td
       colSpan={scop}
       className="py-5 px-4 pl-9 h-[400px] border-strokedark dark:border-white xl:pl-11"
     >
       <div className="flex h-[400px] items-center justify-center bg-none">
         <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
       </div>
     </td>
   </tr>
 );
};

export default TableLoader;
