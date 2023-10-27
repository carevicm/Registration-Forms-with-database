import PropTypes from 'prop-types';

const Checkbox = ({ label, isChecked, onCheckboxChange }) => {
  return (
    <label className="flex items-center mb-2 pl-1">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onCheckboxChange}
        className="appearance-none h-6 w-6 border border-[#4A079C] rounded mr-3 checked:bg-[#38383E] checked:border-[#FFFFFF]"
        aria-label={label}
      />
      <span className="font-semibold text-[#38383E]">{label}</span>
    </label>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;
