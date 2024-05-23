import { default as BootStrapButton } from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
import classnames from "classnames";
import styles from "./index.module.css";
function Button({ className, children, isLoading, disabled, ...props }) {
  return (
    <BootStrapButton
      {...props}
      className={classnames(styles?.["cw-button"], className)}
      disabled={disabled || isLoading}
    >
      <span className="mr-2">{children}</span>
      {isLoading && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      )}
    </BootStrapButton>
  );
}

export default Button;
