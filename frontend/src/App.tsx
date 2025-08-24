import { Route, Routes, useLocation } from "react-router-dom";
import "../src/index.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import React, { Suspense, useEffect } from "react";
import RedirectAuthUser from "./utils/RedirectAuthUser";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Header from "./components/Header";
import Loader from "./shared/Loader";
import MobileNav from "./components/MobileNav";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import UserNotLogged from "./utils/UserNotLogged";
import CheckUserRole from "./utils/ChechUserRole";

const Books = React.lazy(() => import("../src/pages/Books"));
const Book = React.lazy(() => import("../src/pages/Book"));
const Genre = React.lazy(() => import("../src/pages/Genre"));
const Wishlist = React.lazy(() => import("../src/pages/Wishlist"));
const Search = React.lazy(() => import("../src/pages/Search"));
const Dashboard = React.lazy(() => import("../src/pages/Dashboard"));

function App() {
  //============= useAuthStore =============//
  const { isCheckingAuth, checkAuth } = useAuthStore();

  const location = useLocation();

  const hiddenRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
  ];

  const hideRoute = hiddenRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      {/*============= Header (Exluded from hiddenRoutes) =============*/}
      {!hideRoute && <Header />}

      {/*============= Loading State =============*/}
      {isCheckingAuth && <Loader />}

      <Suspense fallback={<Loader />}>
        <Routes>
          {/*============= Homepage =============*/}
          <Route path="/" element={<Home />} />

          {/*============= Authentication Routes =============*/}

          {/*============= Signup =============*/}
          <Route
            path="/signup"
            element={
              <RedirectAuthUser>
                <SignUp />
              </RedirectAuthUser>
            }
          />

          {/*============= Login =============*/}
          <Route
            path="/login"
            element={
              <RedirectAuthUser>
                <Login />
              </RedirectAuthUser>
            }
          />

          {/*============= Verify Email =============*/}
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/*============= Forgot Password? =============*/}
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthUser>
                <ForgotPassword />
              </RedirectAuthUser>
            }
          />

          {/*============= Reset Password =============*/}
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthUser>
                <ResetPassword />
              </RedirectAuthUser>
            }
          />

          {/*============= Genre Routes =============*/}
          <Route path="/genres/:slug" element={<Genre />} />

          {/*============= Books Routes =============*/}
          <Route path="/books" element={<Books />} />
          <Route path="/books/:slug" element={<Book />} />
          <Route path="/books/search" element={<Search />} />

          {/*============= Wishlist =============*/}
          <Route
            path="/wishlist"
            element={
              <UserNotLogged>
                <Wishlist />
              </UserNotLogged>
            }
          />

          {/*============= Admin Dashboard =============*/}
          <Route
            path="/admin"
            element={
              <CheckUserRole>
                <Dashboard />
              </CheckUserRole>
            }
          />
        </Routes>
      </Suspense>

      {/*============= Mobile Navbar (Exluded from hiddenRoutes) =============*/}
      {!hideRoute && <MobileNav />}

      {/*============= Footer (Exluded from hiddenRoutes) =============*/}
      {!hideRoute && <Footer />}

      {/*============= React Toaster =============*/}
      <Toaster />
    </>
  );
}

export default App;
