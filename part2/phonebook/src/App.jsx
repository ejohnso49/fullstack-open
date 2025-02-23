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

    const foundIndex = persons.findIndex((elem) => elem.name === newName);
    if (foundIndex >= 0) {
      if (persons[foundIndex].number !== newNumber) {
        const response = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
        if (response) {
          const updatedPerson = {...persons[foundIndex], number: newNumber};
          phonebook.updatePerson(updatedPerson).then((response) => {
            const newPersons = persons.slice();
            newPersons[foundIndex] = updatedPerson;
            setPersons(newPersons);
          });
        }
      } else {
        alert(`${newName} is already added to phonebook`);
      }
    } else {
      phonebook.newPerson({ name: newName, number: newNumber }).then((newPerson) => {
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

  const deletePersonFactory = (id, name) => {
    return () => {
      const result = window.confirm(`Delete ${name}?`);

      if (result) {
        phonebook.deletePerson(id).then(() => {
          const newPersons = persons.slice();
          const deletedIndex = newPersons.findIndex((val) => val.id === id);
          newPersons.splice(deletedIndex, 1);
          setPersons(newPersons);
        });
      }
    };
  };

  const filteredPersons = persons.filter((person) => person.name.toLocaleLowerCase().includes(searchFilter));

  const personComponents = filteredPersons.map((person) => {
    return <Person name={person.name} number={person.number} key={person.id} deletePerson={deletePersonFactory(person.id, person.name)} />;
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchFilter={searchFilter} handleSearchFilterChange={handleSearchFilterChange} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleAdd={handleAdd} />
      <h2>Numbers</h2>
      {personComponents}
    </div>
  );
}

export default App
