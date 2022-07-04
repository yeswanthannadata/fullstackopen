import { useState, useEffect } from "react";

import phoneService from "./services/phonebook";

const Filter = ({ filtered, onChange }) => {
  return (
    <div>
      filter shown with
      <input value={filtered} onChange={onChange} />
    </div>
  );
};

const PersonForm = ({
  onSubmit,
  nameChangeHandler,
  numberChangeHandler,
  newName,
  number,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={nameChangeHandler} />
      </div>
      <div>
        number: <input value={number} onChange={numberChangeHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, filtered }) => {
  const data = persons.filter((person) => {
    if (person.name.toLowerCase().includes(filtered.toLowerCase())) {
      return true;
    }
    return false;
  });

  return data.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}
    </p>
  ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filtered, setFilter] = useState("");

  useEffect(() => {
    phoneService.getAll().then((allPhones) => {
      setPersons(allPhones);
    });
  }, []);

  const newNameHandler = (event) => {
    event.preventDefault();
    const isExist = persons.some((person) => person.name === newName);
    const isNumberExist = persons.some((person) => person.number === number);

    if (isExist) {
      alert(`${newName} is already added to phonebook`);
    } else if (isNumberExist) {
      alert(`${number} is already added to phonebook`);
    } else {
      const newEntry = {
        name: newName,
        number: number,
      };
      phoneService.create(newEntry).then((updatedEntry) => {
        setPersons(persons.concat(updatedEntry));
        setNewName("");
        setNumber("");
      });
    }
  };

  const nameChangeHandler = (event) => {
    setNewName(event.target.value);
  };

  const numberChangeHandler = (event) => {
    setNumber(event.target.value);
  };

  const filterChangeHandler = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filtered={filtered} onChange={filterChangeHandler} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={newNameHandler}
        nameChangeHandler={nameChangeHandler}
        numberChangeHandler={numberChangeHandler}
        newName={newName}
        number={number}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filtered={filtered} />
    </div>
  );
};

export default App;
