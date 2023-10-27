import PropTypes from "prop-types";

const LinkButton = ({ onClick, label, ariaLabel }) => (
  <button
    className="text-[#4A079C] font-bold cursor-pointer focus:outline-none"
    onClick={onClick}
    aria-label={ariaLabel}
  >
    {label}
  </button>
);

LinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};

export default LinkButton;
