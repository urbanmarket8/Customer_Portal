import { Yup } from "../../../lib";
import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

function phoneNumberValidation(val) {
  if (!val) {
    return true;
  }

  if (val.length < 4) return false;

  try {
    const parsed = phoneUtil.parse(val);
    return phoneUtil.isValidNumber(parsed);
  } catch (error) {
    return false;
  }
}

const schema = Yup.object({
  email: Yup.string()
    .label("Email")
    .required()
    .email("Email is invalid")
    .emailLength(),
  first_name: Yup.string()
    .label("First name")
    .notEmpty("First name shouldn't be only spaces")
    .required(),
  last_name: Yup.string()
    .label("Last name")
    .notEmpty("Last name shouldn't be only spaces")
    .required(),
  username: Yup.string()
    .label("user name")
    .notEmpty("user name shouldn't be only spaces")
    .required(),

  phone_number: Yup.string()
    .label("Phone number")
    .required()
    .test("invalid", "Phone number is invalid", phoneNumberValidation),

  password: Yup.string()
    .label("Password")
    .min(8, "Password is too short - should be 8 chars minimum")
    .test("space", "Your password must be space-free", function (value) {
      if (value) {
        return !value.includes(" ");
      }
    })
    .test(
      "weak",
      "Password must include at least one capital, small letter and number",
      function (value) {
        if (!value) {
          return true;
        }

        const hasSmallChar = !!value.match(/[a-z]/);
        const hasCapitalChar = !!value.match(/[A-Z]/);
        const hasNumbersChar = !!value.match(/\d/);

        return hasSmallChar && hasCapitalChar && hasNumbersChar;
      }
    )
    .required(),

  confirm_password: Yup.string()
    .label("Password")
    .oneOf([Yup.ref("password")], "Password does not match")
    .required(),
});

export default schema;
