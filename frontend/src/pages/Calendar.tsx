import flatpickr from 'flatpickr';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';

const Calendar = () => {
  function getDaysInMonth(year:number, month:number) {
    // Create a date for the first day of the next month, then subtract a day
    return new Date(year, month, 0).getDate();
  }
  const currentDate = new Date();
const [value, setValue] = useState({
  month: currentDate.getMonth()+1,
  year: currentDate.getFullYear(),
  day: currentDate.getDate()
});
  useEffect(() => {
    // Initialize flatpickr
    flatpickr('.form-datepicker', {
      mode: 'single',
      static: true,
      monthSelectorType: 'static',
      dateFormat: 'M j, Y',
      prevArrow:
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
      nextArrow:
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
      onChange: (selectedDates) => {
        if (selectedDates.length > 0) {
          const date = selectedDates[0];
          const month = date.getMonth() + 1; // getMonth() is zero-based
          const year = date.getFullYear();
          const day = date.getDate()
          setValue({ month, year ,day}); // Set month and year only
        }
      },
    });
  }, []);
  
  return (
    <>
      <Breadcrumb pageName="Calendar" />
            <div className="mb-4.5">
     
      <div className="relative">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
      </label>
      <input
            placeholder={value.day+"/"+value.month+"/"+value.year}
            className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            readOnly
          />
       
        <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
          {/* SVG for the date picker icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
              fill="#64748B"
            />
          </svg>
        </div>
      </div>
    </div>
      {/* <!-- ====== Calendar Section Start ====== --> */}
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
              <th className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Sunday </span>
                <span className="block lg:hidden"> Sun </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Monday </span>
                <span className="block lg:hidden"> Mon </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Tuesday </span>
                <span className="block lg:hidden"> Tue </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Wednesday </span>
                <span className="block lg:hidden"> Wed </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Thursday </span>
                <span className="block lg:hidden"> Thur </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Friday </span>
                <span className="block lg:hidden"> Fri </span>
              </th>
              <th className="flex h-15 items-center justify-center rounded-tr-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Saturday </span>
                <span className="block lg:hidden"> Sat </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- Line 1 --> */}
            <tr className="grid grid-cols-7">
              <td className={`${value.day==1?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  1
                </span>
                <span className='absolute select-none left-1/2 top-1/2 -translate-x-1/2 text-primary lg:hidden'>10</span>
                <span className='absolute select-none left-1/2 top-1/2 -translate-x-1/2 max-lg:hidden'>
                
               total Event: <span className='text-primary'>10</span></span>
                <div className="group h-16 w-full flex-grow cursor-pointer py-1 md:h-30">
                  <span className="group-hover:text-primary md:hidden">
                 
                  </span>
               
                </div>
              </td>
              <td className={`${value.day==2?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className=" font-medium text-black dark:text-white">
                  2
                </span>
              </td>
              <td className={`${value.day==3?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  3
                </span>
              </td>
              <td className={`${value.day==4?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  4
                </span>
              </td>
              <td className={`${value.day==5?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  5
                </span>
              </td>
              <td className={`${value.day==6?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  6
                </span>
              </td>
              <td className={`${value.day==7?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  7
                </span>
              </td>
            </tr>
            {/* <!-- Line 1 --> */}
            {/* <!-- Line 2 --> */}
            <tr className="grid grid-cols-7">
              <td className={`${value.day==8?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  8
                </span>
              </td>
              <td className={`${value.day==9?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  9
                </span>
              </td>
              <td className={`${value.day==10?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  10
                </span>
              </td>
              <td className={`${value.day==11?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  11
                </span>
              </td>
              <td className={`${value.day==12?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  12
                </span>
              </td>
              <td className={`${value.day==13?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  13
                </span>
              </td>
              <td className={`${value.day==14?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  14
                </span>
              </td>
            </tr>
            {/* <!-- Line 2 --> */}
            {/* <!-- Line 3 --> */}
            <tr className="grid grid-cols-7">
              <td className={`${value.day==15?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  15
                </span>
              </td>
              <td className={`${value.day==16?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  16
                </span>
              </td>
              <td className={`${value.day==17?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  17
                </span>
              </td>
              <td className={`${value.day==18?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  18
                </span>
              </td>
              <td className={`${value.day==19?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  19
                </span>
              </td>
              <td className={`${value.day==20?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  20
                </span>
              </td>
              <td className={`${value.day==21?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  21
                </span>
              </td>
            </tr>
            {/* <!-- Line 3 --> */}
            {/* <!-- Line 4 --> */}
            <tr className="grid grid-cols-7">
              <td className={`${value.day==22?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  22
                </span>
              </td>
              <td className={`${value.day==23?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  23
                </span>
              </td>
              <td className={`${value.day==24?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  24
                </span>
              </td>
              <td className={`${value.day==25?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  25
                </span>
               
              </td>
              <td className={`${value.day==26?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  26
                </span>
              </td>
              <td className={`${value.day==27?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  27
                </span>
              </td>
              <td className={`${value.day==28?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  28
                </span>
              </td>
            </tr>
            {/* <!-- Line 4 --> */}
            {/* <!-- Line 5 --> */}
            <tr className="grid grid-cols-7">
              <td className={`${value.day==29?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  29
                </span>
              </td>
             {getDaysInMonth(value.year,value.month)>=30&& <td className={`${value.day==30?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  30
                </span>
              </td>
             }
              {getDaysInMonth(value.year,value.month)>=31&& <td className={`${value.day==31?'border-primary':'border-stroke dark:border-strokedark' } ease relative h-20 cursor-pointer border  p-2 transition duration-500 hover:bg-gray  dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}>
                <span className="font-medium text-black dark:text-white">
                  31
                </span>
              </td>
             }
            
            </tr>
            {/* <!-- Line 5 --> */}
          </tbody>
        </table>
      </div>
      {/* <!-- ====== Calendar Section End ====== --> */}
    </>
  );
};

export default Calendar;
