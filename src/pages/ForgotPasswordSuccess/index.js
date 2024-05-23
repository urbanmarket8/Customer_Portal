import { Container, Row, Col } from 'react-bootstrap';
import styles from './index.module.css';
import { PiWarningOctagonDuotone } from 'react-icons/pi';
import logo from "../../logo-default-231x49.png";

export const ForgetPasswordSuccess = () => {

  return (
    <Container className={styles.container} fluid data-testid="forgot-password">
      <Row className="justify-content-md-center">
        <Col md={4}>    
          <Row className={styles.segment} data-testid="check-your-email">
            <Col xs={12} className='text-center'>
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
    <p >Please check your email for a reset password link.</p>
          </Col>
            <p className={styles.confirmation}>
              <PiWarningOctagonDuotone
                style={{ fontSize: '1rem' }}
                className="mb-1 mr-1"
              />
                If you haven't received your email yet, please check your spam folder.
            </p>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgetPasswordSuccess;
