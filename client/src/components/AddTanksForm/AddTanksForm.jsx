import './AddTanksForm.scss';

const AddTanksForm = ({ tanksGroup, setTanks }) => {
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

  return (
    <div className='AddTanksForm-container'>
      <div className='AddTanksForm-form'>
        <div className='AddTanksForm-form_inputs'>
          {tanksGroup.map((tank) => (
            <fieldset className='AddTanksForm_fieldset' key={tank.product}>
              <legend>
                <span>{tank.product}</span>
              </legend>
              {tank.tanks.map((tag) => (
                <div className='AddTanksForm-inputfield' key={tag}>
                  <input
                    type='number'
                    id={tag}
                    name={tag}
                    onChange={handleValuesChange}
                  />
                  <label htmlFor={tag}>{tag}</label>
                </div>
              ))}
            </fieldset>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddTanksForm;
