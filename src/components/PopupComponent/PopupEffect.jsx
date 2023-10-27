
import { useEffect } from "react";
import PropTypes from "prop-types";

const PopupLogic = ({ onClose, children }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return children;
};

PopupLogic.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default PopupLogic;
