import { useState, useEffect } from 'react';

import Person from './components/Person';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

import phonebook from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    phonebook.getPersons().then((initialPersons) => {
      console.log(initialPersons);
      setPersons(initialPersons);
    });
  }, []);

  const handleAdd = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name == newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      phonebook.newPerson({name: newName, number: newNumber}).then((newPerson) => {
        const newPersons = persons.concat(newPerson);
        setPersons(newPersons);
      });
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
    return <Person name={person.name} number={person.number} key={person.id} />;
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
