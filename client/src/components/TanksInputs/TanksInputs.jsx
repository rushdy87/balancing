import { groupedTanksByProductName } from '../../utils/tanks';
import NumberInput from '../NumberInput/NumberInput';
import './TanksInputs.scss';

const TanksInputs = ({ tanks, setTanks }) => {
  const groupedTanks = groupedTanksByProductName(tanks);

  const handleValuesChange = (event) => {
    const tag = event.target.name;
    const volume = parseInt(event.target.value, 10);

    // Find the index of the tank that needs to be updated
    const tankIndex = tanks.findIndex((tank) => tank.tag_number === tag);

    // Create a new array with the updated tank object
    const updatedTanks = tanks.map((tank, index) => {
      if (index === tankIndex) {
        // Update the volume of the matching tank
        return { ...tank, volume: volume };
      }
      return tank; // Return the original tank for non-matching indices
    });

    // Update the state with the new array
    setTanks(updatedTanks);
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
    <div className='TanksInputs-container'>
      <div className='TanksInputs_inputs'>
        {groupedTanks.map((gt) => {
          return (
            <fieldset className='TanksInputs_fieldset' key={gt.product}>
              <legend>
                <span>{gt.product}</span>
              </legend>
              {gt.tanks.map((tank) => {
                return (
                  <div className='TanksInputs-inputfield' key={tank.tag_number}>
                    <NumberInput
                      type='number'
                      id={tank.tag_number}
                      name={tank.tag_number}
                      defaultValue={0}
                      onChange={handleValuesChange}
                      onKeyDown={handleKeyDown}
                    />
                    <label htmlFor={tank.tag_number}>{tank.tag_number}</label>
                  </div>
                );
              })}
            </fieldset>
          );
        })}
      </div>
    </div>
  );
};

export default TanksInputs;
