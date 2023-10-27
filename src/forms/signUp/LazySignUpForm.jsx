import { useState } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import PhoneInput from "react-phone-input-2";
import { FaPhone } from "react-icons/fa";

import validationSchema from "../../components/Validation Schema/validationSchema";
import checkPasswordStrength from "../../components/PasswordStrengthComponent/passwordStrengthUtil";
import InputField from "../../components/InputFieldcomponent/InputField";
import Button from "../../components/ButtonComponent/Button.jsx";
import Checkbox from "../../components/CheckboxComponent/Checkbox";
import { capitalizeFirstLetterOfEachWord } from "../../utils/stringUtils";

const LazySignUpForm = ({
  onHandleSubmit,
  phoneNumber,
  setPhoneNumber,
  showPassword,
  togglePasswordVisibility,
  setPasswordStrength,
  passwordStrength,
  passwordRef,
  rememberMe,
  handleCheckboxChange,
}) => {
  const [isCountrySelected, setIsCountrySelected] = useState(false);

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phoneNumber: phoneNumber,
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onHandleSubmit}
    >
      {({ setFieldValue, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="name"
            placeholder="Full Name"
            autoComplete="off"
            onChange={(e) => {
              const capitalizedValue = capitalizeFirstLetterOfEachWord(
                e.target.value
              );
              setFieldValue("name", capitalizedValue);
            }}
          />

          <InputField
            type="text"
            name="email"
            placeholder="Email Address"
            autoComplete="username"
            onChange={(e) => setFieldValue("email", e.target.value)}
          />

          <div className="mb-4 relative">
            <PhoneInput
              value={phoneNumber}
              onChange={(phone) => {
                const numericPhone = phone.replace(/\D+/g, "");
                setPhoneNumber(numericPhone);
                setFieldValue("phoneNumber", numericPhone);
                setIsCountrySelected(true);
              }}
              onBlur={handleBlur}
              aria-label="Select country code"
              preferredCountries={["ca", "us"]}
              inputProps={{
                required: true,
                className: "w-full p-3 pl-12 rounded-3xl",
                placeholder: "Phone Number",
                name: "phoneNumberUniqueName",
                autoComplete: "on",
                "aria-labelledby": "phoneLabel",
              }}
              dropdownStyle={{
                padding: "1rem",
                borderRadius: "1.5rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                ariaLabel: "Select country code from dropdown",
              }}
            />
            <label id="phoneLabel" className="sr-only">
              Phone Number Input
            </label>
            {!isCountrySelected && (
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <FaPhone
                  className="text-black"
                  size={16}
                  style={{ transform: "rotate(90deg)" }}
                />
              </div>
            )}
          </div>

          <InputField
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            onChange={(e) => {
              const password = e.target.value;
              setFieldValue("password", password);
              setPasswordStrength(checkPasswordStrength(password));
            }}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            passwordStrength={passwordStrength}
            ref={passwordRef}
          />

          <Checkbox
            label="Remember Me"
            isChecked={rememberMe}
            onCheckboxChange={handleCheckboxChange}
          />

          <Button
            type="submit"
            onClick={() => console.log("Sign Up button clicked")}
          >
            Sign Up
          </Button>
        </form>
      )}
    </Formik>
  );
};

LazySignUpForm.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
  togglePasswordVisibility: PropTypes.func.isRequired,
  setPasswordStrength: PropTypes.func.isRequired,
  passwordStrength: PropTypes.string.isRequired,
  passwordRef: PropTypes.object.isRequired,
  rememberMe: PropTypes.bool.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default LazySignUpForm;
