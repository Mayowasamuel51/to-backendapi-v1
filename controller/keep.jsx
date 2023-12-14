import React from "react";
import ErrorPage from "./components/ErrorPage";
import AllCourses from "./components/AllCourses";
const LazyHomePage = React.lazy(()=> import("./pages/HomePage"))
const LazyCourses = React.lazy(()=> import("./pages/Courses"))
const LazyAbout = React.lazy(()=> import("./pages/AboutPage"))
const LazyCOURSE = React.lazy(()=> import("./pages/COURSE"))
const LazyBlogPage = React.lazy(()=> import("./pages/BlogPage"))
import ContactPage from "./pages/ContactPage";
import ConnectWithContractor from "./pages/ConnectWithContractor";
import MyCourses from "./pages/MyCourses";
import Mentorship from "./pages/Mentorship";
const LazyMentorship = React.lazy(()=> import("./pages/Mentorship"))
import LiveCourses from "./pages/LiveCourses";
import CreateAccountForm from "./pages/CreateAccountForm";
import LoginForm from "./pages/LoginForm";
import AdminLoginForm from "./pages/AdminLoginForm";
import CheckOut from "./pages/CheckOut";
import { AnimatePresence } from "framer-motion";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeLayout from "./layoutAuth/HomeLayout";
import AdminLayout from "./layoutAuth/AdminLayout";
const LazyAuthLayout = React.lazy(()=> import("./layoutAuth/AuthLayout"))
import Dashboard from "./dashboard/components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import AdminViewCourses from "./components/AdminViewCourses";
import AllStudents from "./components/AllStudents";
import Contacts from "./components/Contacts";
import Contractors from "./components/Contractors";
import MyProfile from "./pages/MyProfile";
// import DashboardCourses from "./dashboard/components/DashboardCourses";
import PaymentPage from "./pages/PaymentPage";
import Loader from "./components/Loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <React.Suspense fallback={<Loader />}><LazyHomePage /></React.Suspense>,
      },
    
      {
        path: "/courses",
        element: <React.Suspense fallback={<Loader />}><LazyCourses /></React.Suspense>,
        children: [
          {
            index: true,
            element: <AllCourses />,
          },
          {
            path: ":course",
            element:  <React.Suspense fallback={<Loader />}><LazyCOURSE /></React.Suspense>,
          },
        ]
      },
      {
        path: "/about",
        element: <React.Suspense fallback={<Loader />}><LazyAbout /></React.Suspense>,
      },
      {
        path: "/blog",
        element: <React.Suspense fallback={<Loader />}><LazyBlogPage /></React.Suspense>,
      },
      {
        path: "/contact",
        element: <ContactPage />
      },
      {
        path: "/checkout",
        element: <CheckOut />
      },
      {
        path: "/mentorship",
        element: <React.Suspense fallback={<Loader />}><LazyMentorship /></React.Suspense>,
      },
      {
        path: "/liveCourses",
        element: <LiveCourses />
      },
      {
        path: "/myProfile",
        element: <MyProfile />
      },
    ]
  },
  {
    path: "/admin_LOGIN",
    element: <AdminLoginForm />
  },
  {
    path: "/createAccount",
    element: <CreateAccountForm />
  },
  {
    path: "/contractors",
    element: <ConnectWithContractor />,
  },
  {
    path: "/login",
    element: <LoginForm />
  },
  {
    path: "/createAccount",
    element: <CreateAccountForm />
  },
  {
    path: "/dashboard",
    element: <React.Suspense fallback={<Loader />}><LazyAuthLayout /></React.Suspense>,
    children: [
      {
        index: true,
        element: <MyCourses />
      },
      {
        path: "checkout",
        element: <CheckOut />
      },
      {
        path: "myCourses",
        element: <MyCourses />
      },
      {
        path: "mentorship",
        element: <Mentorship />
      },
      
      {
        path: "links",
        element: <h1 className="min-h-screen flex justify-center items-center font-bold text-3xl">LINKS PAGE</h1>
      },
      {
        path: "makePayment",
        element: <PaymentPage />
      },
      {
        path: "/dashboard/post",
        element: <Dashboard />
      },
    ]
  },
  {
    path: "ADMIN-DASHBOARD",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      {
        path: "viewcourses",
        element: <AdminViewCourses />,
        children: [
          {
            index: true,
            element: <h1 className="text-center font-bold md:text-4xl">ALL COURSES</h1>
          },
          {
            path: "published",
            element: <h1 className="text-center font-bold md:text-4xl">PUBLISHED</h1>
          },
          {
            path: "draft",
            element: <h1 className="text-center font-bold md:text-4xl">DRAFT</h1>
          },
        ]
      },
      {
        path: "allStudents",
        element: <AllStudents />
      },
      {
        path: "vendors",
        element: <Contacts />
      },
      {
        path: "analytics",
        element: <Contractors />
      }
    ]
  }
    
]);


function App() {
  return (
    <AnimatePresence>
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;
