import { useEffect } from "react";
import { useFormik } from "formik";
import ForgotPasswordForm from "./components/reset-password-form";
import validationSchema from "./components/reset-password.schema";
import { useMutation } from "../../services/queries/useMutation";
import { useNavigate } from "react-router-dom";
import toaster from "../../toaster";
import { resetPaswordApi } from "../../services/api/auth";

const initialValues = {
  email: "",
  token: "",
  password: "",
  confirm_password: "",
};

export const ResetPassword = () => {
  const navigate = useNavigate();

  const { mutate: onSubmit, isMutating } = useMutation(resetPaswordApi, {
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => toaster.error(error),
  });
  const formik = useFormik({
    onSubmit,
    validateOnChange: false,
    initialValues,
    validationSchema,
  });

  const { setFieldValue } = formik;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const token = urlParams.get("token");

    if (email) {
      setFieldValue("email", email);
    }

    if (token) {
      setFieldValue("token", token);
    }
  }, [setFieldValue]);

  return <ForgotPasswordForm formik={formik} isLoading={isMutating} />;
};

export default ResetPassword;
