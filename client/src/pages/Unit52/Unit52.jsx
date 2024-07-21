import { useEffect, useState } from 'react';
import {
  Blending,
  Button,
  ContentPreview,
  CrudeOil,
  Datepicker,
  Modal,
  NaturalGas,
  TanksInputs,
} from '../../components';
import { addTanks, getTanksByUnit } from '../../api/tanks';
import './Unit52.scss';
import { prepareTanksObject } from '../../utils/tanks';
import { addBlending } from '../../api/blending';
import { addCrudeOil } from '../../api/crude-oil';
import { addNaturalGas } from '../../api/natural-gas';

const Unit52 = () => {
  const [showPreview, setShowPreview] = useState(false);
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

  // Crude Oil
  const [crudeOil, setCrudeOil] = useState({
    reservoir_m3: 0,
    reservoir_bbl: 0,
    receiving: 0,
    sending: 0,
  });

  // Natural Gas
  const [naturalGas, setNaturalGas] = useState({
    receiving_m3: 0,
    receiving_mscf: 0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowPreview(true);
    // add tanks // {day, tanks}

    // add blending

    // add crude
    // add Gas
    console.log({ day, ...naturalGas });
  };

  const addVolumes = async () => {
    // const tanksRes = await addTanks('u52', {
    //   day,
    //   tanks: prepareTanksObject(tanks),
    // });
    // console.log(tanksRes);
    // const u52Tanks = await getTanksByUnit('u52');
    // setTanks(u52Tanks.map((tank) => ({ ...tank, volume: 0 })));

    // const blendingRes = await addBlending({ day, ...blendingQuantities });
    // console.log(blendingRes);
    // setBlendingQuantities({
    //   lpg: 0,
    //   pg: 0,
    //   rg: 0,
    //   diesel: 0,
    //   hfo: 0,
    // });

    // const crudeRes = await addCrudeOil({ day, ...crudeOil });
    // console.log(crudeRes);
    // setCrudeOil({
    //   reservoir_m3: 0,
    //   reservoir_bbl: 0,
    //   receiving: 0,
    //   sending: 0,
    // });

    const naturalGasRes = await addNaturalGas({ day, ...naturalGas });
    console.log(naturalGasRes);
    setNaturalGas({
      receiving_m3: 0,
      receiving_mscf: 0,
    });
    setShowPreview(false);
  };

  return (
    <div className='u52-container'>
      <div className='u52_header'>
        <h1>Unit 52</h1>
        <Datepicker date={day} changeDate={changeDate} />
      </div>
      <div className='hr' />
      <form className='u52_form' onSubmit={handleSubmit}>
        <div className='u52_tanks'>
          <h3 className='u52_subheading'>الخزين</h3>
          <TanksInputs tanks={tanks} setTanks={setTanks} />
        </div>

        <div className='blending_crude_gas'>
          <div className='u52_blending'>
            <h3 className='u52_subheading'>مزج المنتجات</h3>
            <div>
              <Blending setBlendingQuantities={setBlendingQuantities} />
            </div>
          </div>

          <div className='u52_crudeOil'>
            <h3 className='u52_subheading'>النفط الخام</h3>
            <div>
              <CrudeOil setCrudeOil={setCrudeOil} />
            </div>
          </div>

          <div className='u52_gas'>
            <h3 className='u52_subheading'>الغاز الطبيعي</h3>
            <div>
              <NaturalGas setNaturalGas={setNaturalGas} />
            </div>
          </div>
        </div>

        <Button type='sumit'>معاينة</Button>
      </form>

      {/* Modal */}
      {showPreview && (
        <Modal
          renderedContent={
            <ContentPreview
              content={{
                day,
                unit: 'Unit 52',
                subjects: {
                  tanks: prepareTanksObject(tanks),
                  blendingQuantities,
                  crudeOil,
                  naturalGas,
                },
              }}
            />
          }
          save={addVolumes}
          close={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default Unit52;
