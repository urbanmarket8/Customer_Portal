import { Container } from "react-bootstrap";
import styles from "./index.module.css";
import Navbar from "../navbar/navbar";

const Layout = ({ children, settings = {} }) => {
  return (
    <Container className={styles.container} fluid>
      <Navbar {...settings?.navProps} />
      <Container className={styles.mainContainer} fluid>
        {children}
      </Container>
    </Container>
  );
};

export default Layout;
