import React from "react";
import { Redirect } from "react-router-dom";


import LeafletMaps from "../pages/Maps/LeafletMaps/LeafletMaps";

//AuthenticationInner pages

import CoverSignIn from '../pages/AuthenticationInner/Login/CoverSignIn';
import PasswordReset from "../pages/Authentication/PasswordReset";
import CoverSignUp from "../pages/AuthenticationInner/Register/CoverSignUp";

//pages

import SimplePage from '../pages/Pages/Profile/SimplePage/SimplePage';

import Team from '../pages/Pages/Team/Team';

import Faqs from '../pages/Pages/Faqs/Faqs';
import Pricing from '../pages/Pages/Pricing/Pricing';
import Gallery from '../pages/Pages/Gallery/Gallery';
import Maintenance from '../pages/Pages/Maintenance/Maintenance';

import SearchResults from '../pages/Pages/SearchResults/SearchResults';

import CoverPasswReset from '../pages/AuthenticationInner/PasswordReset/CoverPasswReset';

import CoverLockScreen from '../pages/AuthenticationInner/LockScreen/CoverLockScr';

import CoverLogout from '../pages/AuthenticationInner/Logout/CoverLogout';

import CoverSuccessMsg from '../pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg';

import CoverTwosVerify from '../pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify';

import Cover404 from '../pages/AuthenticationInner/Errors/Cover404';

import Error500 from '../pages/AuthenticationInner/Errors/Error500';

import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";

//login
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import NFTLanding from "../pages/Landing/NFTLanding";

const authProtectedRoutes = [
  //Maps
//   { path: "/maps-google", component: GoogleMaps },
//   { path: "/maps-vector", component: VectorMaps },
  { path: "/maps-leaflet", component: LeafletMaps },

  //Pages
  
  { path: "/pages-profile", component: SimplePage },
 
  { path: "/pages-team", component: Team },
  
  { path: "/pages-faqs", component: Faqs },
  { path: "/pages-gallery", component: Gallery },
  { path: "/pages-pricing", component: Pricing },
  
  { path: "/pages-search-results", component: SearchResults },


  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
  },
];

const publicRoutes = [
  // Authentication Page
  
  { path: "/login", component: CoverSignIn },  
  { path: "/register", component: CoverSignUp }, 
  { path: "/forgot-password", component: CoverPasswReset },  
  { path: "/lock-screen", component: CoverLockScreen }, 
  { path: "/logout", component: CoverLogout },
  { path: "/success-msg", component: CoverSuccessMsg },  
  { path: "/auth-twostep", component: CoverTwosVerify }, 
  { path: "/auth-404", component: Cover404 },
  { path: "/auth-500", component: Error500 },
  { path: "/pages-maintenance", component: Maintenance },
  {path:"/passwordReset/:email/:token",component:PasswordReset},
 


  { path: "/", component: NFTLanding },

  { path: "/auth-offline", component: Offlinepage },

];

export { authProtectedRoutes, publicRoutes };