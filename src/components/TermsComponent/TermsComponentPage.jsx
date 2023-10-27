import PropTypes from "prop-types";
import LinkButton from "./LinkButton";

const CONTENT_KEYS = {
  TERMS: "termsAndConditions",
  PRIVACY: "privacyPolicy",
};

const TermsComponent = ({ handlePopupClick, pageType }) => {
  return (
    <p className="mt-4 text-xs sm:text-sm text-center font-semibold text-[#38383E]">
      By clicking &quot;{pageType === "signup" ? "Sign Up" : "Sign In"}&quot;
      button, I expressly agree to the{" "}
      <LinkButton
        onClick={() => handlePopupClick(CONTENT_KEYS.TERMS)}
        label="Terms of Service"
        ariaLabel="Open Terms of Service"
      />{" "}
      and understand that my account information will be used according to
      Coding Solution{" "}
      <LinkButton
        onClick={() => handlePopupClick(CONTENT_KEYS.PRIVACY)}
        label="Data Privacy"
        ariaLabel="Open Data Privacy"
      />
      .
    </p>
  );
};

TermsComponent.propTypes = {
  handlePopupClick: PropTypes.func.isRequired,
  pageType: PropTypes.oneOf(["signup", "signin"]).isRequired,
};

export default TermsComponent;
