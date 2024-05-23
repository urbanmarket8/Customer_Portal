import { Form } from "react-bootstrap";
import classnames from "classnames";

function Password({ name, onChange, value, isInvalid, classNames, ...props }) {
  return (
    <Form.Control
      type="password"
      name={name}
      value={value}
      autoComplete="new-password"
      onChange={onChange}
      isInvalid={isInvalid}
      className={classnames(...(classNames || []))}
      {...props}
    />
  );
}

export default Password;
