import { useCallback } from "react";
import { useFormik } from "formik";

import SignupForm from "./components/SignupForm";

import validationSchema from "./components/SignupForm.schema";
import { signUpApi } from "../../services/api/auth";
import { useMutation } from "../../services/queries/useMutation";
import { useNavigate } from "react-router-dom";
import toaster from "../../toaster";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  password: "",
  confirm_password: "",
  username: "",
};

const Signup = () => {
  const navigate = useNavigate();
  const { mutate, isMutating } = useMutation(signUpApi, {
    onSuccess: () => {
      toaster.success("signed up successfully");
      navigate("/login");
    },
  });

  const onSubmit = useCallback(
    async (formData) => {
      const values = { ...formData };

      delete values.confirm_password;

      delete values.actual_phone_number;
      mutate(values);
    },
    [mutate]
  );

  const formik = useFormik({
    onSubmit,
    validateOnChange: false,
    initialValues,
    validationSchema,
  });

  return <SignupForm formik={formik} isSubmitting={isMutating} />;
};

export default Signup;
