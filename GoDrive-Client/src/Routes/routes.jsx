import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "../Components/CommonPages/Layout";
import UserLayout from "../Components/UserPages/UserLayout";
import DriverLayout from "../Components/DriverPages/DriverLayout";
import AdminLayout from "../Components/AdminPages/AdminLayout";
import PrivateRoute from "../Components/Auth/PrivateRoute";
import NotFound from "../Components/CommonPages/Pages/NotFound";
import Loader from "../Utils/Loader";
import ErrorBoundary from "../Utils/ErrorBoundary";
import DutyLayout from "../Components/DriverPages/DutyLayout";
import Driverdetails from "../Components/DriverPages/Pages/Driver/DriverDetails";
import EarningsTracker from "../Components/DriverPages/Pages/Rides/EarningsTracker";
import Notifications from "../Components/DriverPages/Pages/Notifications";
import NavigationMap from "../Components/DriverPages/Pages/OnDuty/NavigationMap";
import ProfileManagement from "../Components/DriverPages/Pages/Profile/ProfileManagement"
import RideManagement from "../Components/DriverPages/Pages/Rides/RideManagement"
import RideHistory from "../Components/DriverPages/Pages/Rides/RideHistory";
import BookingDetails from "../Components/AdminPages/Pages/DetailsPages/BookingDetails";

// Lazy-loaded components
const Home = lazy(() => import("../Components/CommonPages/Pages/Home"));
const About = lazy(() => import("../Components/CommonPages/Pages/About"));
const Help = lazy(() => import("../Components/CommonPages/Pages/Help"));
const Contact = lazy(() => import("../Components/CommonPages/Pages/Contact"));
const Blog = lazy(() => import("../Components/CommonPages/Pages/More/Blog"));
const HowGodriveWorks = lazy(() => import("../Components/CommonPages/Pages/More/HowGodriveWorks"));
const Offerings = lazy(() => import("../Components/CommonPages/Pages/More/Offering"));
const MailSentSuccess = lazy(() => import("../Components/Auth/MailSentSuccess "));

// User Pages
const ManageAccount = lazy(() => import('../Components/UserPages/Pages/Profiles/Manage_account'));
const Support = lazy(() => import('../Components/UserPages/Pages/Profiles/Support'));
const Wallet = lazy(() => import('../Components/UserPages/Pages/Profiles/Wallet'));
const MyTrips = lazy(() => import('../Components/UserPages/Pages/Mytrips'));
const RentalForm = lazy(() => import('../Components/UserPages/Pages/RentalForm'));
const RideForm = lazy(() => import('../Components/UserPages/Pages/RideForm'));

// Authentication Pages
const Login = lazy(() => import("../Components/Auth/Login"));
const Register = lazy(() => import("../Components/Auth/Register"));
const ResetPassword = lazy(() => import("../Components/Auth/ResetPassword"));
const ForgotPassword = lazy(() => import("../Components/Auth/ForgotPassword"));
const OtpVerification = lazy(() => import("../Components/Auth/OtpVerification"));

// Driver Pages
const Driver = lazy(() => import("../Components/DriverPages/Pages/Driver/Driver"));
const DriverApplicationForm = lazy(() => import("../Components/DriverPages/Pages/Form/DriverApplicationForm"));
const ProfileSettings = lazy(() => import("../Components/DriverPages/Pages/Profile/ProfileSettings"));
const SuccessPage = lazy(() => import("../Components/DriverPages/Pages/SuccessPage"));

//Duty Pages
const OffDutyPage = lazy(() => import("../Components/DriverPages/Pages/Duty/OffDutyPage"));
const OnDutyPage = lazy(() => import("../Components/DriverPages/Pages/Duty/OnDutyPage"));



// Admin Pages
const AdminHome = lazy(() => import("../Components/AdminPages/Pages/Home"));
const Inbox = lazy(() => import("../Components/AdminPages/Pages/Inbox"));
const Profile = lazy(() => import("../Components/AdminPages/Pages/Profile"));
const Notification = lazy(() => import("../Components/AdminPages/Pages/Notification"));
const AdminSettings = lazy(() => import("../Components/AdminPages/Pages/Settings"));
const UserList = lazy(() => import("../Components/AdminPages/Pages/Transpotation/userList"));
const TripList = lazy(() => import("../Components/AdminPages/Pages/Transpotation/tripList"));
const DriverList = lazy(() => import("../Components/AdminPages/Pages/Transpotation/driverList"));
const AccessControl = lazy(() => import("../Components/AdminPages/Pages/Management/AccessControl"));
const UserDetails = lazy(() => import("../Components/AdminPages/Pages/DetailsPages/UserDetails"));
const DriverDetails = lazy(() => import("../Components/AdminPages/Pages/DetailsPages/DriverDetails"));

const AppRoutes = () => {
  const routes = [
    { path: "/signin", element: <Login /> },
    { path: "/signup", element: <Register /> },
    { path: "/verify-otp", element: <OtpVerification /> },
    { path: "/verify-otp/:email", element: <OtpVerification /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/mail-sent-success", element: <MailSentSuccess /> },
    { path: "/resetpassword", element: <ResetPassword /> },
    { path: "/resetpassword/:token", element: <ResetPassword /> },  
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "help", element: <Help /> },
        { path: "contact", element: <Contact /> },
        { path: "more/how-godrive-works", element: <HowGodriveWorks /> },
        { path: "more/our-offerings", element: <Offerings /> },
        { path: "more/blog", element: <Blog /> },
        {path: "more/blogs/:id", element: <article />}
      ],
    },
    {
      path: "/admin",
      element: <PrivateRoute element={<AdminLayout />} role="admin" />,
      children: [
        { index: true, element: <AdminHome /> },
        { path: "user-list", element: <UserList /> },
        { path: "trip-list", element: <TripList /> },
        { path: "driver-list", element: <DriverList /> },
        { path: "management/access-control", element: <AccessControl /> },
        { path: "inbox", element: <Inbox /> },
        { path: "notification", element: <Notification /> },
        { path: "profile", element: <Profile /> },
        { path: "settings", element: <AdminSettings /> },
        { path: "user-details", element: <UserDetails /> },
        { path: "booking-details", element: <BookingDetails /> }, 
        { path: "driver-details/:driverId", element: <DriverDetails /> },
      ],
    },
    {
      path: "/driver",
      element: <PrivateRoute element={<DriverLayout />} role="driver" />,  
      children: [
        { index: true, element: <Driver /> },
        { path: "form", element: <DriverApplicationForm /> },
        { path: "profile-settings", element: <ProfileSettings /> },
      ],
    },
    {
      path: "/duty",
      element: <PrivateRoute element={<DutyLayout />} role="driver" />, // Use "driver" role since "duty" isn't a role.
      children: [
        { index: true, element: <OffDutyPage /> },
        { path: "off-duty", element: <OffDutyPage /> },
        { path: "on-duty", element: <OnDutyPage /> }, 
        { path: "driver-details", element: <Driverdetails /> }, 
        { path: "earnings", element: <EarningsTracker /> }, 
        { path: "navigation-map", element: <NavigationMap /> }, 
        { path: "profile", element: <ProfileManagement /> }, 
        { path: "ride-management", element: <RideManagement /> }, 
        { path: "notifications", element: <Notifications /> },
        { path: "ride-history", element: <RideHistory/> },

      
      ],
    },
    
    {
      path: "/driver/success", element: <SuccessPage />,  // This path will render SuccessPage without DriverLayout
    },
    {
      path: "/user",
      element: <PrivateRoute element={<UserLayout />} role="user" />,
      children: [
        { index: true, element: <RideForm /> },
        { path: "rental-form", element: <RentalForm /> },
        { path: "mytrips", element: <MyTrips /> },
        { path: "profiles/manage_account", element: <ManageAccount /> },
        { path: "profiles/support", element: <Support /> },
        { path: "profiles/wallet", element: <Wallet /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ];

  const element = useRoutes(routes);

  return (
    <Suspense fallback={<Loader/>}>
      {/* <ErrorBoundary> */}
        {element}
      {/* </ErrorBoundary> */}
      </Suspense>
  );
};

export default AppRoutes;
