import React, { useState, useEffect, useRef, Suspense } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import { ClipLoader } from "react-spinners";

import termsData from "../../data/termsData";
import FormPage from "../../components/FormComponent/FormPage";

const LazySignUpForm = React.lazy(() => import("./LazySignUpForm"));

const SignUpPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const passwordRef = useRef(null);

  useEffect(() => {
    if (passwordRef.current && passwordRef.current.value) {
      setShowPassword(false);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onHandleSubmit = async (values, actions) => {
    console.log("Form values:", values);
    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        {
          fullName: values.name,
          email: values.email,
          phone: values.phoneNumber,
          password: values.password,
          rememberMe: rememberMe,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        navigate("/homepage");
      } else {
        console.error(response.data.msg || "Error registering user.");
      }
    } catch (err) {
      console.error("Error registering user:", err.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleCheckboxChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handlePopupClick = (contentKey) => {
    setPopupContent(termsData[contentKey]);
    setShowPopup(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const phoneInput = document.querySelector(
        'input[name="phoneNumberUniqueName"]'
      );
      if (phoneInput && phoneInput.value !== phoneNumber) {
        const numericPhone = phoneInput.value.replace(/\D+/g, "");
        setPhoneNumber(numericPhone);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [phoneNumber]);

  useEffect(() => {
    const setAriaLabelInterval = setInterval(() => {
      const selectedFlag = document.querySelector(
        ".react-tel-input .selected-flag"
      );
      if (selectedFlag && !selectedFlag.getAttribute("aria-label")) {
        selectedFlag.setAttribute("aria-label", "Toggle country code dropdown");
      }
    }, 500);

    return () => clearInterval(setAriaLabelInterval);
  }, []);

  return (
    <FormPage
      title="Sign Up"
      isSignUp={true}
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
        <LazySignUpForm
          onHandleSubmit={onHandleSubmit}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          setPasswordStrength={setPasswordStrength}
          passwordStrength={passwordStrength}
          passwordRef={passwordRef}
          rememberMe={rememberMe}
          handleCheckboxChange={handleCheckboxChange}
        />
      </Suspense>
    </FormPage>
  );
};

export default SignUpPage;
