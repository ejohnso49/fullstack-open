const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important';
  const className = note.important ? 'note note-important' : 'note';

  return (
    <li className={className}>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
