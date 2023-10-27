import React from "react";
import { Field, ErrorMessage } from "formik";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import PropTypes from "prop-types";
import PasswordStrength from "../PasswordStrengthComponent/PasswordStrength";

const InputField = React.forwardRef(
  (
    {
      type,
      name,
      placeholder,
      autoComplete,
      onChange,
      togglePasswordVisibility,
      showPassword,
      passwordStrength,
    },
    ref
  ) => {
    const currentType = name === "password" && showPassword ? "text" : type;

    return (
      <div className="mb-4">
        <div className="relative mb-2">
          <Field
            className="w-full p-3 border rounded-3xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            type={currentType}
            name={name}
            placeholder={placeholder}
            autoComplete={autoComplete}
            onChange={onChange}
            aria-label={placeholder}
            innerRef={ref}
          />
          {name === "password" && togglePasswordVisibility && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 px-3 flex items-center focus:outline-none"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          )}
        </div>
        <ErrorMessage
          name={name}
          component="div"
          className="text-[#750B0B] font-medium"
        />
        {name === "password" && passwordStrength && (
          <PasswordStrength strength={passwordStrength} />
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

InputField.defaultProps = {
  passwordStrength: "",
};

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  autoComplete: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  togglePasswordVisibility: PropTypes.func,
  showPassword: PropTypes.bool,
  passwordStrength: PropTypes.string,
};

export default InputField;
