import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

import Button from "../../components/ButtonComponent/Button.jsx";
import validationSchema from "../../components/Validation Schema/changePasswordValidation.jsx";
import checkPasswordStrength from "../../components/PasswordStrengthComponent/passwordStrengthUtil.jsx";
import PasswordStrength from "../../components/PasswordStrengthComponent/PasswordStrength.jsx";
import { STRENGTH_VALUES } from "../../utils/constants.js";

function ChangePassword() {
  const navigate = useNavigate();
  const [passwordStrengthState, setPasswordStrengthState] = useState(
    STRENGTH_VALUES.WEAK
  );
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const Modal = ({ children }) => {
    return ReactDOM.createPortal(
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        {children}
      </div>,
      document.body
    );
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#475569] via-[#3f3f46] to-[#44403c]">
      <div
        className={`flex flex-col w-full max-w-xl items-center p-6 bg-white bg-opacity-80 rounded-3xl shadow-lg backdrop-blur-md`}
      >
        <div className="flex items-center justify-between w-full mb-5">
          <button
            onClick={handleBack}
            className="bg-[#55028D] text-white rounded-full p-2 hover:bg-[#7A1FB7] focus:outline-none focus:ring-2 focus:ring-offset-2"
            aria-label="Go back"
          >
            <FaChevronLeft size={24} />
          </button>
          <p className="text-center font-semibold text-base text-[#5473E3]">
            Change your password
          </p>
          <div className="w-10"></div>
        </div>
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (values.password !== values.confirmPassword) {
              setModalMessage("Passwords do not match.");
              setShowModal(true);
              return;
            }

            if (passwordStrengthState === STRENGTH_VALUES.WEAK) {
              setModalMessage(
                "Password is not strong enough. Please follow the guidelines."
              );
              setShowModal(true);
              return;
            }

            try {
              const response = await axios.post(
                "http://localhost:5000/api/change-password",
                {
                  newPassword: values.password,
                },
                {
                  withCredentials: true,
                }
              );

              if (response.data.msg === "Password updated successfully") {
                setModalMessage("Password updated successfully!");
                setShowModal(true);
                setTimeout(() => {
                  navigate("/homepage");
                }, 2000);
              } else {
                setModalMessage("Failed to update password. Please try again.");
                setShowModal(true);
              }
            } catch (error) {
              console.error("Error updating password:", error.response.data);
              setModalMessage("Failed to update password. Please try again.");
              setShowModal(true);
            }
          }}
        >
          {({ errors, setFieldValue }) => (
            <Form className="flex flex-col w-full items-center">
              <input type="hidden" name="email" value="user@example.com" />

              <input type="hidden" name="username" value="John Doe" />

              <Field
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                className={`block mx-auto rounded-3xl w-full p-2 mt-5 ${
                  errors.password
                    ? "border-[#C93B32] focus:border-[#C93B32]"
                    : "border-[#AEBBCD]"
                }`}
                onChange={(e) => {
                  const password = e.target.value;
                  setFieldValue("password", password);
                  const strength = checkPasswordStrength(password);
                  setPasswordStrengthState(strength);
                }}
              />
              <ErrorMessage
                name="password"
                component="span"
                className="block text-[14px] text-[#C93B32] mb-5"
              />
              <PasswordStrength strength={passwordStrengthState} />

              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                className={`block mx-auto rounded-3xl w-full p-2 mt-5 mb-5 ${
                  errors.confirmPassword
                    ? "border-[#C93B32] focus:border-[#C93B32]"
                    : "border-[#AEBBCD]"
                }`}
              />
              <ErrorMessage
                name="confirmPassword"
                component="span"
                className="block text-[14px] text-[#C93B32] mb-5"
              />
              {showModal && (
                <Modal>
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <p className="text-[#38383E] font-medium mb-4">
                      {modalMessage}
                    </p>
                    <button
                      onClick={() => setShowModal(false)}
                      className="border-2 border-[#C93B32] text-[#C93B32] rounded px-4 py-2 hover:bg-[#C93B32] hover:text-white transition duration-300"
                    >
                      Close
                    </button>
                  </div>
                </Modal>
              )}

              <Button type="submit" className="w-full">
                Change
              </Button>

              <div className="font-semibold text-[#38383E] w-full mt-10">
                <label className="block text-[#38383E] mb-4">
                  Password must contain:
                </label>

                <div className="flex items-center mt-2">
                  {errors.password &&
                  errors.password.includes("8 characters") ? (
                    <FaTimes className="mr-2" />
                  ) : (
                    <FaCheck className="mr-2" />
                  )}
                  <p>Enter a password of at least 8 characters;</p>
                </div>

                <div className="flex items-center mt-2">
                  {errors.password && errors.password.includes("1 number") ? (
                    <FaTimes className="mr-2" />
                  ) : (
                    <FaCheck className="mr-2" />
                  )}
                  <p>Enter at least 1 number;</p>
                </div>

                <div className="flex items-center mt-2">
                  {errors.password && errors.password.includes("lowercase") ? (
                    <FaTimes className="mr-2" />
                  ) : (
                    <FaCheck className="mr-2" />
                  )}
                  <p>Enter at least 1 lowercase character;</p>
                </div>

                <div className="flex items-center mt-2">
                  {errors.password && errors.password.includes("uppercase") ? (
                    <FaTimes className="mr-2" />
                  ) : (
                    <FaCheck className="mr-2" />
                  )}
                  <p>Enter at least 1 uppercase character;</p>
                </div>

                <div className="flex items-center mt-2">
                  {errors.password &&
                  errors.password.includes("special character") ? (
                    <FaTimes className="mr-2" />
                  ) : (
                    <FaCheck className="mr-2" />
                  )}
                  <p>Enter at least 1 special character;</p>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default ChangePassword;
