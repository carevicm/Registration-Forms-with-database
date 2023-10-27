import * as yup from "yup";
import regex from "../../utils/RegexAction";

const changePasswordValidationSchema = yup.object({
  password: yup
    .string()
    .required("Password field is required.")
    .min(8, "Enter a password of at least 8 characters.")
    .matches(regex.number, "Enter at least 1 number.")
    .matches(regex.lowerCase, "Enter at least 1 lowercase character.")
    .matches(regex.upperCase, "Enter at least 1 uppercase character.")
    .matches(regex.specialCharacter, "Enter at least 1 special character."),
  confirmPassword: yup
    .string()
    .required("The confirm password field is required.")
    .oneOf([yup.ref("password")], "Passwords are not the same."),
});

export default changePasswordValidationSchema;
