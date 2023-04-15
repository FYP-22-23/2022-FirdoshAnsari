// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignOut from "layouts/authentication/sign-out";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard"
import Landlords from "layouts/landlords";
import Tenants from "layouts/tenants"
import GenerateBill from "layouts/generateBill";
import {Payments, Receipt} from "@mui/icons-material";
import {Payment} from "./layouts/payment";
import {BillHistory} from "./layouts/billHistory";

const getRoutes = (isAdmin) => {
  if(isAdmin){
    return [
      {
        type: "collapse",
        name: "Landlords",
        key: "landlords",
        route: "/landlords",
        icon: <Office size="12px" />,
        component: Landlords,
        noCollapse: true,
        protected: true,
      },
      { type: "title", title: "Account Pages", key: "account-pages" },
      {
        type: "collapse",
        name: "Profile",
        key: "profile",
        route: "/profile",
        icon: <CustomerSupport size="12px" />,
        component: Profile,
        noCollapse: true,
        protected: true,
      },
      {
        type: "none",
        name: "Sign In",
        key: "sign-in",
        route: "/authentication/sign-in",
        icon: <Document size="12px" />,
        component: SignIn,
        noCollapse: true,
      },
      {
        type: "collapse",
        name: "Logout",
        key: "sign-out",
        route: "/authentication/sign-out",
        icon: <SpaceShip size="12px" />,
        component: SignOut,
        noCollapse: true,
      },
    ]
  }
  return [
    {
      type: "collapse",
      name: "Dashboard",
      key: "dashboard",
      route: "/dashboard",
      icon: <Shop size="12px" />,
      component: Dashboard,
      noCollapse: true,
      protected: true,
    },
    {
      type: "collapse",
      name: "Generate Bill",
      key: "generate-bill",
      route: "/generate-bill",
      icon: <CreditCard size="12px" />,
      component: GenerateBill,
      noCollapse: true,
      protected: true,
    },
    {
      type: "collapse",
      name: "Payment",
      key: "payment",
      route: "/payment",
      icon: <Payments size="12px" />,
      component: Payment,
      noCollapse: true,
      protected: true,
    },
    {
      type: "collapse",
      name: "Bill History",
      key: "bill-history",
      route: "/bill-history",
      icon: <Receipt size="12px" />,
      component: BillHistory,
      noCollapse: true,
      protected: true,
    },
    {
      type: "collapse",
      name: "Tenants",
      key: "tenants",
      route: "/tenants",
      icon: <Office size="12px" />,
      component: Tenants,
      noCollapse: true,
      protected: true,
    },
    { type: "title", title: "Account Pages", key: "account-pages" },
    {
      type: "collapse",
      name: "Profile",
      key: "profile",
      route: "/profile",
      icon: <CustomerSupport size="12px" />,
      component: Profile,
      noCollapse: true,
      protected: true,
    },
    {
      type: "none",
      name: "Sign In",
      key: "sign-in",
      route: "/authentication/sign-in",
      icon: <Document size="12px" />,
      component: SignIn,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Logout",
      key: "sign-out",
      route: "/authentication/sign-out",
      icon: <SpaceShip size="12px" />,
      component: SignOut,
      noCollapse: true,
    },
  ]
};

export default getRoutes;
