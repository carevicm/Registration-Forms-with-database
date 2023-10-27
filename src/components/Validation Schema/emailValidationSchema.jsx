import * as yup from "yup";

const emailValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email field is required.")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid e-mail with a top-level domain (e.g., .com, .org)."
    ),
});

export default emailValidationSchema;
