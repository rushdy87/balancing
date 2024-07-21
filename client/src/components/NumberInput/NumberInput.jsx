import './NumberInput.scss';

function NumberInput({ id, name, onChange, value }) {
  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 38: // Up arrow
      case 40: // Down arrow
      case 37: // Left arrow
      case 39: // Right arrow
        event.preventDefault(); // Prevent arrow keys from changing the value
        break;
      default:
        // Allow other keys to change the value (optional)
        break;
    }
  };

  return (
    <input
      className='number-input'
      type='number'
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
    />
  );
}

export default NumberInput;
