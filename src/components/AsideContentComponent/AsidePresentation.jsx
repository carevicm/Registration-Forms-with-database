import { useNavigate } from "react-router-dom";
import Button from "../ButtonComponent/Button.jsx";
import ImageSrc from "./ImageSrc";
import PropTypes from "prop-types";

const AsideContent = ({ buttonText = "Sign Up", buttonAction }) => {
  const navigate = useNavigate();
  const imageSrc = ImageSrc();

  const defaultButtonAction = () => {
    navigate("/signup");
  };

  return (
    <div
      className="flex-1 bg-no-repeat bg-cover bg-center rounded-3xl p-4 md:p-0"
      style={{ backgroundImage: `url(${imageSrc})` }}
      aria-label="Decorative background image"
    >
      <aside className="login-aside flex flex-col justify-center items-center h-full p-4 md:p-10 w-full">
        <div className="text-center space-y-2 md:space-y-4">
          <p className="text-xs sm:text-sm md:text-md font-semibold text-white mb-2 md:mb-4">
            You Can Have Any Message Here
          </p>
          <p className="text-xxs sm:text-xs md:text-base text-white mb-2 md:mb-4">
            Any text
          </p>
          <p className="text-xxs sm:text-xs md:text-base text-white mb-2 md:mb-4">
            Anystyle
          </p>
          <Button
            className="w-4/12 md:w-7/12 text-xs md:text-base text-white px-2 py-2 md:py-3"
            type="submit"
            onClick={buttonAction || defaultButtonAction}
            role="button"
            aria-label={buttonText}
          >
            {buttonText}
          </Button>
        </div>
      </aside>
    </div>
  );
};

AsideContent.propTypes = {
  buttonText: PropTypes.string,
  buttonAction: PropTypes.func,
};

export default AsideContent;
