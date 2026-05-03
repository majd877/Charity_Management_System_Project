import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import CoverOne from '../images/cover/cover-01.png';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Profile = () => {
  return (
    <>
      <Breadcrumb pageName="الملف الشخصي" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
        
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/70 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative flex justify-center content-center drop-shadow-2">
              <img className='' src="/logo2.png" alt="profile" />
          
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {Cookies.get("name")}
            </h3>
            <p className="font-medium">{Cookies.get("email")}</p>
           
            <div className="mx-auto max-w-180">
              <h4 className="font-semibold mt-12 text-black dark:text-white">
               مرحبا بكم 
              </h4>
              <pre className="mt-4.5" style={{direction:"ltr"}}>
              يمكنك التواصل مع الادمن ان كان لديك اي مشكلة
               <br /> 
               +963 xxx xxx xxx
              </pre>
            </div>

          
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
