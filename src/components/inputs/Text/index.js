import { Form } from "react-bootstrap";
import classnames from "classnames";
import styles from "./index.module.css";
import { forwardRef } from "react";

const Text = forwardRef(
  (
    {
      name,
      value,
      onChange,
      isInvalid,
      disabled,
      placeholder,
      className,
      inputRef,
      isValid,
      ...props
    },
    ref
  ) => {
    return (
      <Form.Control
        data-testid="text"
        type="text"
        name={name}
        isValid={isValid}
        value={value || ""}
        onChange={onChange}
        isInvalid={isInvalid}
        disabled={disabled}
        placeholder={placeholder}
        className={classnames({ [styles.trim]: disabled }, className)}
        ref={inputRef || ref}
        title={disabled ? value : ""}
        {...props}
      />
    );
  }
);

export default Text;
