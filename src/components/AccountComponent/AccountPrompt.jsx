import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AccountPrompt = ({ isSignUp }) => {
  const message = isSignUp
    ? "Already have an account?"
    : "Don't have an account?";
  const linkText = isSignUp ? "Sign In" : "Sign Up";
  const linkTo = isSignUp ? "/signin" : "/signup";

  return (
    <div className="mb-4 mt-4 text-center font-semibold text-[#38383E]">
      {message}{" "}
      <Link
        to={linkTo}
        className="text-[#4A079C] font-semibold hover:underline"
        aria-label={`Go to ${linkText} page`}
      >
        {linkText}
      </Link>
    </div>
  );
};

AccountPrompt.propTypes = {
  isSignUp: PropTypes.bool.isRequired,
};

export default AccountPrompt;
