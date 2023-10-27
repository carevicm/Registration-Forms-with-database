import regex from "../../utils/RegexAction";
import { STRENGTH_VALUES } from "../../utils/constants";

const checkPasswordStrength = (password) => {
  let strength = STRENGTH_VALUES.WEAK;

  if (
    password.length >= 8 &&
    regex.number.test(password) &&
    regex.lowerCase.test(password) &&
    regex.upperCase.test(password) &&
    regex.specialCharacter.test(password)
  ) {
    strength = STRENGTH_VALUES.STRONG;
  } else if (
    password.length >= 6 &&
    (regex.number.test(password) || regex.lowerCase.test(password) || regex.upperCase.test(password))
  ) {
    strength = STRENGTH_VALUES.MEDIUM;
  }

  return strength;
};

export default checkPasswordStrength;
