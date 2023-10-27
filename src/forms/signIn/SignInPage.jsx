import React, { useState, useCallback, Suspense } from "react";
import axios from "axios";
import termsData from "../../data/termsData";
import FormPage from "../../components/FormComponent/FormPage";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const LazySignInForm = React.lazy(() => import("./LazySignInForm"));

const SignInPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const onHandleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/signin",
        {
          email: values.email,
          password: values.password,
          rememberMe: rememberMe,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/homepage");
      } else {
        console.error(response.data.msg || "Error logging in.");
        if (response.data.msg === "Username is not matching") {
          actions.setFieldError("email", "Username is not matching");
        } else if (response.data.msg === "Password is not matching") {
          actions.setFieldError("password", "Password is not matching");
        }
      }
    } catch (err) {
      console.error("Error logging in:", err.message);
      if (err.response && err.response.data && err.response.data.msg) {
        if (err.response.data.msg === "Username is not matching") {
          actions.setFieldError("email", "Username is not matching");
        } else if (err.response.data.msg === "Password is not matching") {
          actions.setFieldError("password", "Password is not matching");
        } else {
          actions.setFieldError("email", "Error logging in. Please try again.");
        }
      } else {
        actions.setFieldError("email", "Error logging in. Please try again.");
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prevState) => !prevState);
  }, []);

  const handleCheckboxChange = (event) => {
    setRememberMe(event.target.checked);
  };
  const handlePopupClick = useCallback((contentKey) => {
    setPopupContent(termsData[contentKey]);
    setShowPopup(true);
  }, []);

  return (
    <React.Fragment>
      <FormPage
        title="Sign In"
        isSignUp={false}
        handlePopupClick={handlePopupClick}
        showPopup={showPopup}
        popupContent={popupContent}
        onClosePopup={() => setShowPopup(false)}
      >
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-full">
              <ClipLoader color="#123abc" size={50} />
            </div>
          }
        >
          <LazySignInForm
            onHandleSubmit={onHandleSubmit}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            setPasswordStrength={setPasswordStrength}
            rememberMe={rememberMe}
            handleCheckboxChange={handleCheckboxChange}
            passwordStrength={passwordStrength}
          />
        </Suspense>
      </FormPage>
    </React.Fragment>
  );
};

export default SignInPage;
