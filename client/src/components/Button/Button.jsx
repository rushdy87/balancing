import './Button.scss';

const Button = ({ children, className, style, type, onClick, disabled }) => {
  return (
    <>
      <button
        className={`button ${className}`}
        style={style}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
