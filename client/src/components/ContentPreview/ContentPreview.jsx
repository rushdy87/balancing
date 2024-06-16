import './ContentPreview.scss';

const ArSubjects = {
  tanks: 'الخزين',
  blendingQuantities: 'كميات الخلط',
};

const ContentPreview = ({ content }) => {
  console.log(content);
  return (
    <div className='ContentPreview_container'>
      <div className='ContentPreview_header'>
        <h3>{content.unit}</h3>
        <h3>{content.day}</h3>
      </div>
      <div className='ContentPreview_subjects'>
        {Object.keys(content.subjects).map((subject) => {
          return (
            <div key={subject} className='ContentPreview_subject'>
              <h2>{ArSubjects[subject]}</h2>
              {Object.keys(content.subjects[subject]).map((key) => {
                return (
                  <div key={key} className='ContentPreview_subject_item'>
                    <span>{key}</span>
                    <span>{content.subjects[subject][key]}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentPreview;

// content => {day, unit, subjects:{subject1:{}, subject2:{}}}
