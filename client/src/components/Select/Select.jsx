import './Select.scss';

// options = [{vale, lable}]
const Select = ({ label, id, name, options, onChange }) => {
  return (
    <div className='select-container'>
      <label htmlFor={id}>{label}</label>
      <select name={name} id={id} onChange={onChange}>
        {options.length > 0 &&
          options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
