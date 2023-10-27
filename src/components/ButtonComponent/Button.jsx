import PropTypes from "prop-types";

const Button = ({ children, onClick, className, ariaLabel, type = "button" }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-[#55028D] text-white text-lg font-semibold p-3 mt-4 mb-2 rounded-3xl hover:bg-[#7A1FB7] ${className}`}
      aria-label={ariaLabel || children}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  ariaLabel: PropTypes.string,
};

Button.defaultProps = {
  className: "",
};

export default Button;
