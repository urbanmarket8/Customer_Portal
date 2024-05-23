import { Col, Form } from "react-bootstrap";
import classnames from "classnames";
import { useMemo } from "react";
import { getIn } from "formik";
import styles from "./index.module.css";
import Inputs from "../inputs";

export default function InputGroup({
  xs,
  type,
  label,
  formik,
  customError,
  name,
  testId,
  hasLabel = true,
  onChange,
  capitalizeFirstLetter = true,
  validation,
  isValid,
  required = false,
  disabled = false,
  style,
  placeholder,
  ariaLabel,
  inputAriaLabel,
  shouldUseTranslation = true,
  RequiredFlagComponent,
  requiredFlagClassNames,
  ...props
}) {
  const InputType = useMemo(() => {
    return Inputs?.[type] || null;
  }, [type]);
  const value = getIn(formik.values, name);
  const error = getIn(formik.errors, name);

  return (
    <Form.Group as={Col} xs={xs} className={styles.group} style={style}>
      {label && hasLabel && (
        <Form.Label className={styles.label} data-testid="label">
          {label}
          {required && (
            <span
              data-testid="required-flag"
              className={classnames("h5", {
                "text-danger": error,
              })}
            >
              *
            </span>
          )}
        </Form.Label>
      )}

      <InputType
        value={value}
        name={name}
        label={label}
        className={styles.field}
        isInvalid={!!error}
        isValid={isValid}
        error={error}
        onChange={disabled ? () => {} : onChange || formik.handleChange}
        formik={formik}
        disabled={disabled}
        placeholder={placeholder}
        aria-label={inputAriaLabel ?? name}
        {...props}
      />

      <Form.Control.Feedback
        data-testid="validation-feedback"
        type="invalid"
        style={{ display: !!error && "block" }}
        role="alert"
        aria-label={ariaLabel}
      >
        {!!error && typeof error === "object"
          ? Object.values(error).map((errValue) => errValue)
          : error}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
