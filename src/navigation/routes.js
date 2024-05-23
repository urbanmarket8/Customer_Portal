import { createBrowserRouter } from "react-router-dom";
import Products from "../pages/Products";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Logout from "../pages/Logout";
import SCREENS from "./constants";
import ForgetPaswword from "../pages/ForgotPassword";
import ForgetPasswordSuccess from "../pages/ForgotPasswordSuccess";
import ResetPassword from "../pages/ResetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Products />,
  },
  {
    path: SCREENS.LOGIN,
    element: <Login />,
  },
  {
    path: SCREENS.SIGN_UP,
    element: <Signup />,
  },
  {
    path: SCREENS.LOGOUT,
    element: <Logout />,
  },
  {
    path: SCREENS.PRODUCTS,
    element: <Products />,
  },
  {
    path: SCREENS.FORGET_PASSWORD,
    element: <ForgetPaswword />,
  },
  {
    path: SCREENS.FORGET_PASSWORD_SUCCESS,
    element: <ForgetPasswordSuccess />,
  },
  {
    path: SCREENS.RESET_PASSWORD,
    element: <ResetPassword />,
  },
]);

