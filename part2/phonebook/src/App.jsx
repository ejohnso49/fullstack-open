import { useState } from 'react';

const Filter = ({ searchFilter, handleSearchFilterChange }) => {
  return (
    <div>
      filter shown with <input value={searchFilter} onChange={handleSearchFilterChange} />
    </div>
  );
};

const Person = ({name, number, id}) => {
  return (
    <p key={id}>{name} {number}</p>
  )
};

const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, handleAdd}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={handleAdd}>add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  const handleAdd = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name == newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }));
    }

    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchFilterChange = (event) => {
    setSearchFilter(event.target.value);
  }

  const filteredPersons = persons.filter((person) => person.name.toLocaleLowerCase().includes(searchFilter));

  const personComponents = filteredPersons.map((person) => {
    return <Person name={person.name} number={person.number} id={person.id} />;
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchFilter={searchFilter} handleSearchFilterChange={handleSearchFilterChange} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleAdd={handleAdd}/>
      <h2>Numbers</h2>
      {personComponents}
    </div>
  );
}

export default App
