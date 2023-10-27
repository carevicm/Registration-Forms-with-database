import React from "react";
import Header from "../../components/HeaderComponent/Header";
import AccountPrompt from "../../components/AccountComponent/AccountPrompt";
import AsideContent from "../AsideContentComponent/AsidePresentation";
import Popup from "../../components/PopupComponent/Popup";
import TermsComponent from "../../components/TermsComponent/TermsComponentPage";
import PropTypes from "prop-types";

const FormPage = ({
  title,
  isSignUp,
  children,
  handlePopupClick,
  showPopup,
  popupContent,
  onClosePopup,
}) => {
  return (
    <React.Fragment>
      <div
        id={isSignUp ? "SignUpPage" : "SignInPage"}
        className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-[#475569] via-[#3f3f46] to-[#44403c] p-4 md:p-12"
        role="main"
        aria-label={isSignUp ? "Sign Up Page" : "Sign In Page"}
      >
       <main className="login-main relative z-5 p-4 md:p-10 w-full md:max-w-md mx-auto bg-gradient-to-t from-white/80 to-white/60 rounded-3xl shadow-md mb-4 md:mb-0 md:mr-10 flex-1">

          <Header title={title} />
          <AccountPrompt isSignUp={isSignUp} />
          {children}

          <TermsComponent
            handlePopupClick={handlePopupClick}
            pageType={isSignUp ? "signup" : "signin"}
          />
          {showPopup && <Popup content={popupContent} onClose={onClosePopup} />}
        </main>
        <AsideContent />
      </div>
    </React.Fragment>
  );
};

FormPage.propTypes = {
  title: PropTypes.string.isRequired,
  isSignUp: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  handlePopupClick: PropTypes.func.isRequired,
  showPopup: PropTypes.bool.isRequired,
  popupContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      lastModified: PropTypes.string.isRequired,
      intro: PropTypes.string.isRequired,
      sections: PropTypes.arrayOf(
        PropTypes.shape({
          heading: PropTypes.string.isRequired,
          content: PropTypes.string.isRequired,
        })
      ),
    }),
  ]).isRequired,
  onClosePopup: PropTypes.func.isRequired,
};

export default FormPage;
