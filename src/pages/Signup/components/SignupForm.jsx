import React, { useState } from 'react';
import { Form, Row } from 'react-bootstrap';
import styles from './SignupForm.module.css';
import InputGroup from '../../../components/InputGroup';
import Button from '../../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignupForm = ({ formik, isSubmitting }) => {
  const { handleSubmit } = formik || {};

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit} data-testid="singup-form">
      <Form.Group data-testid="singup-desc">
        <Form.Label className={styles.header}>Sign up</Form.Label>
        <Form.Text className={styles.desc}>Create a new account</Form.Text>
      </Form.Group>

      <Row>
        <InputGroup
          xs={6}
          type="Text"
          label="First name"
          formik={formik}
          name="first_name"
          required
        />

        <InputGroup
          xs={6}
          type="Text"
          label="Last name"
          formik={formik}
          name="last_name"
          required
        />
      </Row>

      <Row>
        <InputGroup
          type="Text"
          xs={6}
          label="Email"
          formik={formik}
          name="email"
          autoComplete="username"
          required
        />
        <InputGroup
          type="Text"
          xs={6}
          label="User name"
          formik={formik}
          name="username"
          autoComplete="username"
          required
        />
        <InputGroup
          type="PhoneNumber"
          xs={6}
          label="Phone number"
          name="phone_number"
          formik={formik}
          required
        />
      </Row>
      <Row>
        <InputGroup
          type={showPassword ? 'Text' : 'Password'} // Conditionally render type based on showPassword state
          xs={6}
          label="Password"
          formik={formik}
          name="password"
          autoComplete="username"
          required
        />
        <InputGroup
          type={showPassword ? 'Text' : 'Password'} // Conditionally render type based on showPassword state
          xs={6}
          label="Repeat Password"
          formik={formik}
          name="confirm_password"
          autoComplete="new-password"
          required
        />
        {/* Icon-based "Show Password" button */}
        <div className={styles.showPasswordBtn} onClick={togglePasswordVisibility}>
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </div>
      </Row>

      <Row className="justify-content-md-center">
        <Button variant="primary" type="submit" data-testid="signup" isLoading={isSubmitting}>
          Sign up
        </Button>
      </Row>
    </Form>
  );
};

export default SignupForm;
