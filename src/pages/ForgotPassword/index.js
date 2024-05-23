import React from "react";
import { useFormik } from "formik";
import ForgotPasswordForm from "./components/forgot-password-form";
import validationSchema from "./components/forgot-password.schema";
import { useMutation } from "../../services/queries/useMutation";
import toaster from "../../toaster";
import { useNavigate } from "react-router-dom";
import { ForgetPaswordApi } from "../../services/api/auth";
import SCREENS from "../../navigation/constants";

const initialValues = {
  email: "",
};

const ForgetPaswword = () => {
  const navigate = useNavigate();
  const { mutate:onSubmit, isMutating } = useMutation(ForgetPaswordApi, {
    onSuccess: () => {
      navigate(SCREENS.FORGET_PASSWORD_SUCCESS);
    },
    onError: (error) => toaster.error(error),
  });

  const formik = useFormik({
    onSubmit,
    validateOnChange: false,
    initialValues,
    validationSchema,
  });

  return <ForgotPasswordForm formik={formik} isLoading={isMutating} />;
};

export default ForgetPaswword;
