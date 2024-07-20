import { useEffect, useState } from 'react';
import { getTanksByUnit } from '../../api/tanks';
import './Unit53.scss';
import {
  Button,
  ContentPreview,
  Datepicker,
  Modal,
  TanksInputs,
} from '../../components';
import { prepareTanksObject } from '../../utils/tanks';

const Unit53 = () => {
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
      const u53Tanks = await getTanksByUnit('u53');
      setTanks(u53Tanks.map((tank) => ({ ...tank, volume: 0 })));
    })();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowPreview(true);
  };

  return (
    <div className='u53-container'>
      <div className='u53_header'>
        <h1>Unit 53</h1>
        <Datepicker date={day} changeDate={changeDate} />
      </div>
      <div className='hr' />
      <form className='u53_form' onSubmit={handleSubmit}>
        <div className='u53_tanks'>
          <h3 className='u53_subheading'>الخزين</h3>
          <TanksInputs tanks={tanks} setTanks={setTanks} />
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
                },
              }}
            />
          }
          save={() => console.log('Save')}
          close={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default Unit53;
