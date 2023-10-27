import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AsidePresentation from "./AsidePresentation";

const AsideLogic = ({ buttonText = "Sign Up", navigateToSignUp = "/signup" }) => {
  const navigate = useNavigate();

  const buttonAction = () => {
    navigate(navigateToSignUp);
  };

  return (
    <AsidePresentation
      buttonText={buttonText}
      buttonAction={buttonAction}
    />
  );
};

AsideLogic.propTypes = {
  buttonText: PropTypes.string,
  navigateToSignUp: PropTypes.string,
};

export default AsideLogic;
