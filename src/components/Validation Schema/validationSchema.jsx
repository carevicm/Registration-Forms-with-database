import * as yup from "yup";
import regex from "../../utils/RegexAction";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email field is required.")
    .email("Please enter a valid e-mail."),
  password: yup
    .string()
    .required("Password field is required.")
    .min(8, "Password must be at least 8 characters long.")
    .test(
      "password-strength",
      "Invalid password. Ensure it has at least one uppercase letter, one lowercase letter, one number, and one special character.",
      (value) => {
        return (
          regex.number.test(value) &&
          regex.lowerCase.test(value) &&
          regex.upperCase.test(value) &&
          regex.specialCharacter.test(value)
        );
      }
    ),
});

export default validationSchema;
