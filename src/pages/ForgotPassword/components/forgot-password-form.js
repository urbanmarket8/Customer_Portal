import React from "react";
import { Form, Row } from "react-bootstrap";
import styles from "./forgot-password-form.module.css";
import Button from "../../../components/Button";
import InputGroup from "../../../components/InputGroup";

const ForgotPasswordForm = ({ formik, isLoading }) => {
  return (
    <Form
      className={styles.form}
      onSubmit={formik.handleSubmit}
      data-testid="forgot-form"
    >
      <Form.Group data-testid="form-header">
        <Form.Label className={styles.header}>Forgot password</Form.Label>

        <Form.Text className={styles.desc}>
          Use your email to reset your password
        </Form.Text>
      </Form.Group>
      <Row>
        <InputGroup
          xs={12}
          type="Text"
          placeholder="Email"
          name="email"
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.email}
          label="Email"
          formik={formik}
        />
      </Row>

      <Button
        variant="primary"
        type="submit"
        data-testid="submit"
        isLoading={isLoading}
      >
        Submit
      </Button>
    </Form>
  );
};

export default ForgotPasswordForm;
