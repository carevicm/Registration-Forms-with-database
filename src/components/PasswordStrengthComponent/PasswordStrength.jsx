import PropTypes from "prop-types";
import { STRENGTH_VALUES } from "../../utils/constants"; 

const PasswordStrength = ({ strength }) => {
  const commonClasses = "mt-2 mb-2";

  let displayText = "";
  let colorClass = "";

  switch (strength) {
    case STRENGTH_VALUES.WEAK:
      displayText = "Password Strength: weak";
      colorClass = "text-[#750A0A]";
      break;
    case STRENGTH_VALUES.MEDIUM:
      displayText = "Password Strength: medium";
      colorClass = "text-[#252598]";
      break;
    case STRENGTH_VALUES.STRONG:
      displayText = "Password Strength: strong";
      colorClass = "text-[#174007]";
      break;
    default:
      return null;
  }

  return (
    <span className={`${commonClasses} ${colorClass}`} aria-live="polite">
      {displayText}
    </span>
  );
};

PasswordStrength.propTypes = {
  strength: PropTypes.oneOf(Object.values(STRENGTH_VALUES)).isRequired,
};

PasswordStrength.defaultProps = {
  strength: STRENGTH_VALUES.WEAK,
};

export default PasswordStrength;
