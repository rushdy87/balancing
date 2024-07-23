import './Input.scss';

const Input = ({
  style,
  label,
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  errorText,
}) => {
  return (
    <div className='input-container'>
      <div className='input'>
        <label htmlFor={id}>{label}</label>
        <input
          style={style}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete='off'
        />
      </div>
      <p className='error-text'>{errorText && errorText}</p>
    </div>
  );
};

export default Input;
