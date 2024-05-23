import { useCallback, useState } from "react";
import { useFormik } from "formik";

import LoginForm from "./components/LoginForm";
import Cookies from "js-cookie";

import validationSchema from "./components/LoginForm.schema";
import { useMutation } from "../../services/queries/useMutation";
import { loginApi } from "../../services/api/auth";
import toaster from "../../toaster";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [isNewSignin, isNewSigninSet] = useState(false);
  const { mutate, isMutating } = useMutation(loginApi, {
    onSuccess: ({ data }) => {
      Cookies.set("at", data.access_token || "", {
        domain: "",
        sameSite: "Lax",
      });
      toaster.success("logged in successfully");
      navigate("/");
    },
    onError: (error) => toaster.error(error?.data?.errors[0]?.detail),
  });

  const onSubmit = useCallback(
    (values) => {
      mutate(values);
    },
    [mutate]
  );

  const newSignIn = useCallback(() => {
    isNewSigninSet(true);
  }, [isNewSigninSet]);

  const formik = useFormik({
    onSubmit,
    validateOnChange: false,
    initialValues,
    validationSchema,
  });

  return (
    <LoginForm
      formik={formik}
      isNewSignin={isNewSignin}
      newSignIn={newSignIn}
      isSubmitting={isMutating}
    />
  );
};

export default Login;
