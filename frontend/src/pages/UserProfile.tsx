
import CoverOne from '../images/cover/cover-01.png';
import moment from 'moment';
interface ProfilerUserProps{
 name:string;
 phone:string;
 image:string;
 email:string;
 plan:any;
 createdAt:Date;
 money:number;
}
const UserProfile:React.FC<ProfilerUserProps> = ({name,email,plan,image,createdAt,phone,money}) => {
  return (
    <>

      <div className="mt-4 overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
          
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto overflow-hidden -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2 ">
              <img style={{borderRadius:"50%"}} className='w-full h-full' src={import.meta.env.VITE_IMAGE_URL+image} alt="profile" />
          
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {name}
            </h3>
            <p className="font-medium">{email}</p>
            <p className="font-medium">{phone}</p>
            <p className="font-medium">{moment(createdAt).format("yyy/MM/DD")}</p>
            <div className="mx-auto mt-4.5 mb-5.5 grid w-3/5 min-w-[370px] grid-cols-2 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <div className='block'>
               {plan.is_USD===1&& <h5 className="font-semibold text-nowrap text-black dark:text-white">
                  {(money*plan.usd.sell_price).toLocaleString()} USD
                </h5>}
                {plan.is_IQD===1&& <h5 className="font-semibold text-nowrap text-black dark:text-white">
                  {(money*plan.iqd.sell_price).toLocaleString()}  IQD
                </h5>}
                {plan.is_JOD===1&& <h5 className="font-semibold text-nowrap text-black dark:text-white">
                  {(money*plan.jod.sell_price).toLocaleString()} JOD
                </h5>}
                {plan.is_MAD===1&& <h5 className="font-semibold text-nowrap text-black dark:text-white">
                  {(money*plan.mad.sell_price).toLocaleString()} MAD
                </h5>}
                {plan.is_SYP===1&& <h5 className="font-semibold text-nowrap text-black dark:text-white">
                  {(money*plan.syp.sell_price).toLocaleString()} SYP
                </h5>}
                </div>
                
                <span className="text-sm">Money</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {plan.name_ar}
                </span>
                <span className="text-sm">Plan</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
