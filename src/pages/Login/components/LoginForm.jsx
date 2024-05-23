import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import InputGroup from '../../../components/InputGroup';
import { Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import SCREENS from '../../../navigation/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm = ({ isLoading, formik, isSubmitting }) => {
  const { handleSubmit, handleChange, values } = formik || {};

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit} data-testid="login-form">
      <fieldset disabled={isLoading}>
        <Form.Group data-testid="form-header">
          <Form.Label className={styles.header}>Welcome</Form.Label>
          <Form.Text className={styles.desc}>Log in to your account</Form.Text>
        </Form.Group>

        <InputGroup
          type="Text"
          formik={formik}
          label="Email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={values?.email}
          className={styles.input}
          testId="email"
          required
        />

        <InputGroup
          type={showPassword ? 'Text' : 'Password'} // Conditionally render type based on showPassword state
          formik={formik}
          label="Password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          className={styles.input}
          testId="password"
          required
        />

        <div className={styles.iconContainer} onClick={togglePasswordVisibility}>
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className={styles.eyeIcon} />
        </div>

        <Link to={SCREENS.FORGET_PASSWORD} className={styles.forgetPassword} data-testid="forgot-password">
          Forgot password?
        </Link>

        <Form.Group as={Col} className="mt-4">
          <Button variant="primary" type="submit" data-testid="submit" isLoading={isSubmitting}>
            Log in
          </Button>
        </Form.Group>

        <Form.Group className={styles.signUpGroup} data-testid="signup">
          <Form.Label>Don't have an account?</Form.Label>
          <Link to={SCREENS.SIGN_UP}>Sign up</Link>
        </Form.Group>
      </fieldset>
    </Form>
  );
};

export default LoginForm;
