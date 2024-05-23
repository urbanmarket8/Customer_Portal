import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";
import styles from "./reset-password-form.module.css";
import InputGroup from "../../../components/InputGroup";
import Button from "../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ForgotPasswordForm = ({ formik, isLoading }) => {
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form className={styles.form} onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label className={styles.header}>Reset Password</Form.Label>
        <Form.Text className={styles.desc}>Set a new password</Form.Text>
      </Form.Group>

      <Row>
        <InputGroup
          xs={12}
          type="Text"
          name="email"
          autoComplete="user-name"
          label="Email"
          formik={formik}
          style={{ display: "none" }}
        />

        <InputGroup
          xs={12}
          type={showPassword ? "Text" : "Password"} // Conditionally render type based on showPassword state
          name="password"
          autoComplete="new-password"
          label="Password"
          formik={formik}
        />

        <InputGroup
          xs={12}
          type={showPassword ? "Text" : "Password"} // Conditionally render type based on showPassword state
          name="confirm_password"
          autoComplete="new-password"
          label="Repeat password"
          formik={formik}
        />

        {/* Show Password button */}
        <div className={styles.iconContainer} onClick={togglePasswordVisibility}>
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </div>
      </Row>

      <Button variant="primary" type="submit" isLoading={isLoading}>
        Reset
      </Button>
    </Form>
  );
};

export default ForgotPasswordForm;
