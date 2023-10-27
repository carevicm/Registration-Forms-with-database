import { useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaChevronLeft } from "react-icons/fa";

import Button from "../../components/ButtonComponent/Button";
import validationSchema from "../../components/Validation Schema/emailValidationSchema";

function ForgotPassword() {
  const navigate = useNavigate();
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
      <div className="flex flex-col w-full max-w-xl items-center p-6 bg-white bg-opacity-80 rounded-3xl shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between w-full mb-5">
          <button
            onClick={handleBack}
            className="bg-[#55028D] text-white rounded-full p-2 hover:bg-[#7A1FB7] focus:outline-none focus:ring-2 focus:ring-offset-2"
            aria-label="Go back"
          >
            <FaChevronLeft size={24} />
          </button>
          <p className="text-center font-semibold text-base text-[#5473E3]">
            Reset your password
          </p>
          <div className="w-10"></div>
        </div>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const response = await axios.post(
                "http://localhost:5000/api/check-email",
                {
                  email: values.email,
                },
                {
                  withCredentials: true,
                }
              );
              if (response.data.exists) {
                navigate("/changepassword");
              } else {
                setModalMessage("Email does not exist. Please sign up.");
                setShowModal(true);
              }
            } catch (error) {
              console.error("Error checking email:", error.response.data);
              setModalMessage("An error occurred. Please try again.");
              setShowModal(true);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col w-full max-w-xl items-center">
              <Field
                name="email"
                type="email"
                placeholder="Confirm your Email ID"
                className={`block mx-auto rounded-3xl w-full h-9 pl-4 mb-5 ${
                  errors.email && touched.email
                    ? "border-[#C93B32] focus:border-[#C93B32]"
                    : "border-[#AEBBCD]"
                }`}
              />
              <ErrorMessage
                name="email"
                component="span"
                className="block text-[14px] text-[#C93B32] mb-5"
              />

              <Button type="submit">Confirm</Button>
            </Form>
          )}
        </Formik>

        {showModal && (
          <Modal>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-[#38383E] font-medium mb-4">{modalMessage}</p>
              <button
                onClick={() => setShowModal(false)}
                className="border-2 border-[#C93B32] text-[#C93B32] rounded px-4 py-2 hover:bg-[#C93B32] hover:text-white transition duration-300"
              >
                Close
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
