const Person = ({name, number, deletePerson}) => {
  return (
    <div>
      <p>{name} {number}</p>
      <button onClick={deletePerson}>delete</button>
    </div>
  )
};

export default Person;
