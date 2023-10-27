import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import validationSchema from "../../components/Validation Schema/validationSchema";
import checkPasswordStrength from "../../components/PasswordStrengthComponent/passwordStrengthUtil";
import InputField from "../../components/InputFieldcomponent/InputField";
import Button from "../../components/ButtonComponent/Button.jsx";
import Checkbox from "../../components/CheckboxComponent/Checkbox";

const LazySignInForm = ({
  onHandleSubmit,
  showPassword,
  togglePasswordVisibility,
  setPasswordStrength,
  rememberMe,
  handleCheckboxChange,
}) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onHandleSubmit}
    >
      {({ handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit} aria-label="Sign In Form">
          <InputField
            type="text"
            name="email"
            placeholder="Email Address"
            autoComplete="username"
            onChange={(e) => setFieldValue("email", e.target.value)}
          />
          <InputField
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={(e) => {
              setFieldValue("password", e.target.value);
              setPasswordStrength(checkPasswordStrength(e.target.value));
            }}
            togglePasswordVisibility={togglePasswordVisibility}
            showPassword={showPassword}
          />
          <div className="flex items-center justify-between mb-4">
            <Checkbox
              label="Remember Me"
              isChecked={rememberMe}
              onCheckboxChange={handleCheckboxChange}
            />
            <Link
              to="/forgotpassword"
              className="text-sm text-[#4A079C] font-semibold hover:underline"
            >
              Forgot Your Password?
            </Link>
          </div>
          <Button type="submit">Sign In</Button>
        </form>
      )}
    </Formik>
  );
};

LazySignInForm.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
  togglePasswordVisibility: PropTypes.func.isRequired,
  setPasswordStrength: PropTypes.func.isRequired,
  rememberMe: PropTypes.bool.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default LazySignInForm;
