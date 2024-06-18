import './ContentPreview.scss';

const ArSubjects = {
  tanks: 'الخزين',
  blendingQuantities: 'كميات الخلط',
  crudeOil: 'النفط الخام',
  naturalGas: 'الغاز المستلم الطبيعي',
};

const ContentPreview = ({ content }) => {
  return (
    <div className='ContentPreview_container'>
      <div className='ContentPreview_header'>
        <h2>{content.unit}</h2>
        <h2>{content.day}</h2>
      </div>
      <div className='ContentPreview_subjects'>
        {Object.keys(content.subjects).map((subject) => {
          return (
            <div key={subject} className='ContentPreview_subject'>
              <h3>{ArSubjects[subject]}</h3>
              <div className='ContentPreview_subject_volumes'>
                {Object.keys(content.subjects[subject]).map((key) => {
                  return (
                    <div
                      key={key}
                      className={`ContentPreview_subject_item ${
                        content.subjects[subject][key] === 0 ? 'red_bg' : ''
                      }`}
                    >
                      <span>{key}</span>
                      <span>{content.subjects[subject][key]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentPreview;

// content => {day, unit, subjects:{subject1:{}, subject2:{}}}
