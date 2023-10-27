import { useState } from "react";
import PropTypes from "prop-types";

const PhoneNumberInput = ({ onChange }) => {
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneChange = (e) => {
    let value;
    if (typeof e === "object" && e.target) {
      value = e.target.value.replace(/\D/g, "");
    } else if (typeof e === "string") {
      value = e.replace(/\D/g, "");
    }
    setPhoneNumber(value);
    onChange(`${countryCode}${value}`);
  };

  return (
    <div
      className="selected-flag"
      tabIndex="0"
      role="button"
      aria-haspopup="listbox"
      aria-label="Toggle country code dropdown"
    >
      <label id="countryLabel" htmlFor="countryCode">
        Country Code:
      </label>
      <select
        id="countryCode"
        tabIndex="0"
        aria-haspopup="listbox"
        aria-label="Select Country"
        className="w-full p-2 border rounded-md mb-2 select-flag"
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
      >
        <option value="+1">+1</option>
      </select>

      <label htmlFor="phoneNumber">Phone Number:</label>
      <input
        id="phoneNumber"
        className="w-full p-2 border rounded-md"
        aria-label="Enter Phone Number"
        value={`${countryCode} (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
          3,
          6
        )}-${phoneNumber.slice(6, 10)}`}
        onChange={handlePhoneChange}
        placeholder={`${countryCode} (XXX) XXX-XXXX`}
      />
    </div>
  );
};

PhoneNumberInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default PhoneNumberInput;
