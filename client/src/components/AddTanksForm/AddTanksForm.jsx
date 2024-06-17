import NumberInput from '../NumberInput/NumberInput';
import './AddTanksForm.scss';

const AddTanksForm = ({ tanksGroup, setTanks }) => {
  // Initialize the tanks state to { [tag]: 0 } on first render

  const handleValuesChange = (event) => {
    const tag = event.target.name;
    const value = parseInt(event.target.value, 10);

    setTanks((prev) => {
      return {
        ...prev,
        [tag]: value,
      };
    });
  };

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 38: // Up arrow
      case 40: // Down arrow
      case 37: // Left arrow
      case 39: // Right arrow
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  return (
    <div className='AddTanksForm-container'>
      <div className='AddTanksForm-form'>
        <div className='AddTanksForm-form_inputs'>
          {tanksGroup.map((tank) => (
            <fieldset className='AddTanksForm_fieldset' key={tank.product}>
              <legend>
                <span>{tank.product}</span>
              </legend>
              {tank.tanks.map((item) => {
                const tag = Object.keys(item)[0];
                return (
                  <div className='AddTanksForm-inputfield' key={tag}>
                    <NumberInput
                      type='number'
                      id={tag}
                      name={tag}
                      defaultValue={0}
                      onChange={handleValuesChange}
                      onKeyDown={handleKeyDown}
                    />
                    <label htmlFor={tag}>{tag}</label>
                  </div>
                );
              })}
            </fieldset>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddTanksForm;
