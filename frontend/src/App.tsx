import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Calendar from './pages/Calendar';
import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import DefaultLayout from './layout/DefaultLayout';
import Pages from './pages/page/Pages';
import Cookies from 'js-cookie';
import HardSearch from './components/HardSearch/HardSearch';
import Contact from './pages/Contact/Contact';
import Category from './pages/Category/Category';
import Brand from './pages/Category/Brand';
import Representative from './pages/representative/Representative';
import Donors from './pages/Category/Donors';
import Event from './pages/Event/Event';
import DonorsUser from './pages/representative/DonorsUser';
import Beneficiary from './pages/representative/Beneficiary';
import Action from './pages/Event/Action';
import SendMessageOne from './pages/Event/SendMessageOne';
import SendMessageTow from './pages/Event/SendMessageTow';
import BeneficiaryRequest from './pages/Beneficiary/BeneficiaryRequest';
import NewRequestEvent from './pages/Beneficiary/NewRequestEvent';
import MyMessage from './pages/Beneficiary/MyMessage';
import DonorsRequest from './pages/Donors/DonorsRequest';
import MyList from './pages/Donors/MyList';
import RequestAsEmployee from './pages/Authentication/RequestAsEmployee';
import RequestAsBeneficiary from './pages/Authentication/RequestAsBeneficiary';
import RequestAsDonors from './pages/Authentication/RequestAsDonors';
import Order from './pages/Order/Order';
import ComplaintsBeneficiary from './pages/Order/ComplaintsBeneficiary';
import ComplaintsDonors from './pages/Order/ComplaintsDonors';
import OrphanSponsorship from './pages/Order/OrphanSponsorship';
import TreatmentCampaign from './pages/Order/TreatmentCampaign';
import SendMessageDoubtOne from './pages/Event/SendMessageDoubtOne';
import SendMessageDoubtTow from './pages/Event/SendMessageDoubtTow';
import Permission from './pages/Event/Permission';
import RepresentativePermission from './pages/representative/RepresentativePermission';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const  pathname = useLocation();

  if (!Cookies.get("authToken")) {
    console.log(pathname);
    
    if (pathname.pathname?.includes("RequestAsEmployee")) {
      return <RequestAsEmployee/>
    }
    else if(pathname.pathname?.includes("RequestAsBeneficiary")){
      return <RequestAsBeneficiary/>
    }
    else if(pathname.pathname?.includes("RequestAsDonors")){
      return <RequestAsDonors/>
    }
    Cookies.remove("authToken");
    Cookies.remove("adhkfdkljdfahadfhadfhwey");
    return <SignIn/>
  }
  const Admin_Hash="hfdfdfdfeess"
  const justAdmin=()=>{
    if (true) {
      return <>
         <Route
          path="dash/category"
          element={
            <>
              <PageTitle title="" />
              <Category />
            </>
          }
        />
         <Route
          path="dash/sendMessageOne"
          element={
            <>
              <PageTitle title="" />
              <SendMessageOne />
            </>
          }
          
        />
          <Route
          path="dash/SendMessageDoubtOne"
          element={
            <>
              <PageTitle title="" />
              <SendMessageDoubtOne />
            </>
          }
        />
        
          <Route
          path="dash/sendMessageTow"
          element={
            <>
              <PageTitle title="" />
              <SendMessageTow />
            </>
          }
        />
          <Route
          path="dash/SendMessageDoubtTow"
          element={
            <>
              <PageTitle title="" />
              <SendMessageDoubtTow />
            </>
          }
        />
          <Route
          path="dash/Permission"
          element={
            <>
              <PageTitle title="" />
              <Permission />
            </>
          }
        />
        
        
         <Route
          path="dash/donors"
          element={
            <>
              <PageTitle title="" />
              <Donors />
            </>
          }
        />
         <Route
          path="dash/representative"
          element={
            <>
              <PageTitle title="" />
              <Representative />
            </>
          }
        />
         <Route
          path="dash/RepresentativePermission"
          element={
            <>
              <PageTitle title="" />
              <RepresentativePermission />
            </>
          }
        />
        
         <Route
          path="dash/pageDonUser"
          element={
            <>
              <PageTitle title="" />
              <DonorsUser />
            </>
          }
        />
         <Route
          path="dash/action"
          element={
            <>
              <PageTitle title="" />
              <Action />
            </>
          }
        />
        
         <Route
          path="dash/beneficiaryUserPage"
          element={
            <>
              <PageTitle title="" />
              <Beneficiary />
            </>
          }
          // new
        />
         <Route
          path="dash/order"
          element={
            <>
              <PageTitle title="" />
              <Order />
            </>
          }
        />
        
         <Route
          path="dash/ComplaintsBeneficiary"
          element={
            <>
              <PageTitle title="" />
              <ComplaintsBeneficiary />
            </>
          }
        />
         <Route
          path="dash/ComplaintsDonors"
          element={
            <>
              <PageTitle title="" />
              <ComplaintsDonors />
            </>
          }
        />
          <Route
          path="dash/OrphanSponsorship"
          element={
            <>
              <PageTitle title="" />
              <OrphanSponsorship />
            </>
          }
        />
         <Route
          path="dash/TreatmentCampaign"
          element={
            <>
              <PageTitle title="" />
              <TreatmentCampaign />
            </>
          }
        />
  
    </>
    }
   return null
  }
  const justEmployee=()=>{
     if (Cookies.get("user_type")&&Cookies.get("user_type")=="representative") {
      
      return <>
    
         <Route
          path="dash/sendMessageOne"
          element={
            <>
              <PageTitle title="" />
              <SendMessageOne />
            </>
          }
        />
          <Route
          path="dash/sendMessageTow"
          element={
            <>
              <PageTitle title="" />
              <SendMessageTow />
            </>
          }
        />
        
         <Route
          path="dash/donors"
          element={
            <>
              <PageTitle title="" />
              <Donors />
            </>
          }
        />
      
         <Route
          path="dash/pageDonUser"
          element={
            <>
              <PageTitle title="" />
              <DonorsUser />
            </>
          }
        />
         <Route
          path="dash/action"
          element={
            <>
              <PageTitle title="" />
              <Action />
            </>
          }
        />
        
         <Route
          path="dash/beneficiaryUserPage"
          element={
            <>
              <PageTitle title="" />
              <Beneficiary />
            </>
          }
        />
        
         <Route
          path="dash/event"
          element={
            <>
              <PageTitle title="" />
              <Event />
            </>
          }
        />
    </>
    }
   return null
  }
  const justBeneficiary=()=>{
     if (Cookies.get("user_type")&&Cookies.get("user_type")=="beneficiary") {
      
      return <>
       <Route
          path="dash/SendMessageDoubtOne"
          element={
            <>
              <PageTitle title="" />
              <SendMessageDoubtOne />
            </>
          }
        />
         <Route
          path="dash/BeneficiaryRequest"
          element={
            <>
              <PageTitle title="" />
              <BeneficiaryRequest />
            </>
          }
        />
       <Route
          path="dash/NewRequestEvent"
          element={
            <>
              <PageTitle title="" />
              <NewRequestEvent />
            </>
          }
        />
        <Route
          path="dash/MyMessage"
          element={
            <>
              <PageTitle title="" />
              <MyMessage />
            </>
          }
        />
        
    </>
    }
   return null
  }
  const justDonors=()=>{
     if (Cookies.get("user_type")&&Cookies.get("user_type")=="donors") {
      
      return <>
    
         <Route
          path="dash/DonorsRequest"
          element={
            <>
              <PageTitle title="" />
              <DonorsRequest />
            </>
          }
        />
         <Route
          path="dash/MyList"
          element={
            <>
              <PageTitle title="" />
              <MyList />
            </>
          }
        />
        
       <Route
          path="dash/NewRequestEvent"
          element={
            <>
              <PageTitle title="" />
              <NewRequestEvent />
            </>
          }
        />
        <Route
          path="dash/MyMessage"
          element={
            <>
              <PageTitle title="" />
              <MyMessage />
            </>
          }
        />
        
    </>
    }
   return null
  }
  
  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        RequestAsEmployee
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {Cookies.get("adhkfdkljdfahadfhadfhwey")&&Cookies.get("adhkfdkljdfahadfhadfhwey")==Admin_Hash?
              <ECommerce />
            :
            <Profile/>  
            }
            </>
          }
        />
           <Route
          path="dash"
          element={
            <>
              <PageTitle title="" />
             {Cookies.get("adhkfdkljdfahadfhadfhwey")&&Cookies.get("adhkfdkljdfahadfhadfhwey")==Admin_Hash?
              <ECommerce />
            :
            <Profile/>  
            }
            </>
          }
        />
        {justAdmin()}
        {justEmployee()}
        {justBeneficiary()}
        {justDonors()}
   {/*start real route here */}
   <Route
          path="dash"
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {Cookies.get("adhkfdkljdfahadfhadfhwey")&&Cookies.get("adhkfdkljdfahadfhadfhwey")==Admin_Hash?
              <></>
            :
            <Profile/>  
            }
            </>
          }
        />
    <Route
          path="dash/hard-search"
          element={
            <>
              <PageTitle title="" />
              <HardSearch />
            </>
          }
        />   
       
       
        
      
       
   {/* end real route here */}
        <Route
          path="dash/calendar"
          element={
            <>
              <PageTitle title="" />
              <Calendar />
            </>
          }
        />
        <Route
          path="dash/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />

        <Route
          path="dash/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="dash/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
       
      </Routes>
    </DefaultLayout>
  );
}

export default App;
