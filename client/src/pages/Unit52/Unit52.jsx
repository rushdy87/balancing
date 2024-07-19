import { useEffect, useState } from 'react';
import { Blending, Button, Datepicker, TanksInputs } from '../../components';
import { getTanksByUnit } from '../../api/tanks';
import './Unit52.scss';

const Unit52 = () => {
  const [day, setDay] = useState(
    `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`
  );
  const changeDate = (newDate) => {
    setDay(
      `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`
    );
  };

  const [tanks, setTanks] = useState([]);

  useEffect(() => {
    (async () => {
      const u52Tanks = await getTanksByUnit('u52');
      setTanks(u52Tanks.map((tank) => ({ ...tank, volume: 0 })));
    })();
  }, []);

  // Blending
  const [blendingQuantities, setBlendingQuantities] = useState({
    lpg: 0,
    pg: 0,
    rg: 0,
    diesel: 0,
    hfo: 0,
  });

  const handleChange = (event) => {
    event.preventDefault();
    console.log(tanks);
    console.log(blendingQuantities);
  };

  return (
    <div className='u52-container'>
      <div className='u52_header'>
        <h1>Unit 52</h1>
        <Datepicker date={day} changeDate={changeDate} />
      </div>
      <div className='hr' />
      <form className='u52_form' onSubmit={handleChange}>
        <div className='u52_tanks'>
          <h3 className='u52_subheading'>الخزين</h3>
          <TanksInputs tanks={tanks} setTanks={setTanks} />
        </div>

        <div className='u52_blending'>
          <h3 className='u52_subheading'>مزج المنتجات</h3>
          <div>
            <Blending setBlendingQuantities={setBlendingQuantities} />
          </div>
        </div>
        <Button type='sumit'>معاينة</Button>
      </form>
    </div>
  );
};

export default Unit52;
