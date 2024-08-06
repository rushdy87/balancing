import { useState } from 'react';
import './AddNotes.scss';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { addNotes } from '../../api/admin';

const AddNotes = ({ unit, day }) => {
  const [notes, setNotes] = useState([]);

  const handleChange = (event) => {
    const noteIndex = event.target.name;
    const noteValue = event.target.value;

    setNotes((prevNotes) => {
      const newNotes = [...prevNotes];
      newNotes[noteIndex] = noteValue;
      return newNotes;
    });
  };

  const handleDelete = (index) => {
    const newNotes = notes.filter((n, i) => i !== index);
    setNotes(newNotes);
  };

  const handleAddNote = () => {
    setNotes((prevNotes) => [...prevNotes, '']);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const notesToSave = notes.filter((note) => note !== '');
    if (notesToSave.length > 0) {
      await addNotes(unit, { day, notes: notesToSave });
    }
    setNotes([]);
  };

  return (
    <div className='AddNotes_container'>
      {notes.map((note, index) => (
        <div className='note_inputs' key={index}>
          <Input
            style={{ width: '260px' }}
            type='text'
            label={`الملاحظة رقم ${index + 1}`}
            name={index}
            id={`note${index}`}
            placeholder='الرجاء كتابة الملاحظة هنا'
            value={note}
            onChange={handleChange}
          />
          <Button
            type='button'
            className='danger'
            onClick={() => handleDelete(index)}
          >
            🅧
          </Button>
        </div>
      ))}

      <div className='AddNotes_actions'>
        <Button type='button' className='primary' onClick={handleAddNote}>
          {notes.length === 0 ? 'اضافة ملاحظة' : 'ملاحظة أخرى'}
        </Button>
        {notes.length > 0 && (
          <Button type='buttin' onClick={handleSave}>
            حفظ
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddNotes;
