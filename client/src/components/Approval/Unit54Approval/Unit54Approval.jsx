import AddNotes from '../../AddNotes/AddNotes';
import './Unit54Approval.scss';

const Unit54Approval = ({ day }) => {
  return (
    <div className='Approval_cotainer'>
      <h2>Unit 54</h2>
      <AddNotes unit='u54' day={day} />
    </div>
  );
};

export default Unit54Approval;
