import { useState, useEffect } from "react";

import Notification from "./components/Notification";

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

const Persons = ({ persons, filtered, deletePersonHandler }) => {
  const data = persons.filter((person) => {
    if (person.name.toLowerCase().includes(filtered.toLowerCase())) {
      return true;
    }
    return false;
  });

  return data.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}
      <button onClick={() => deletePersonHandler(person.id)}>delete</button>
    </p>
  ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filtered, setFilter] = useState("");
  const [successMess, setSuccessMess] = useState(null);

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
      const updatedPerson = persons.find((person) => person.name === newName);
      if (
        window.confirm(
          `${updatedPerson.name} is already added to phonebook, replace the old number with a new one`
        )
      ) {
        const newPerson = { ...updatedPerson, number };
        phoneService
          .update(newPerson.id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            );
            setNewName("");
            setNumber("");
            setSuccessMess({
              message: `Updated number for ${updatedPerson.name}`,
              type: "success",
            });
            setTimeout(() => {
              setSuccessMess(null);
            }, 5000);
          })
          .catch((error) => {
            setSuccessMess({
              message: `${error.response.data.error}`,
              type: "error",
            });
            setTimeout(() => {
              setSuccessMess(null);
            }, 5000);
          });
      }
    } else if (isNumberExist) {
      alert(`${number} is already added to phonebook`);
    } else {
      const newEntry = {
        name: newName,
        number: number,
      };
      phoneService
        .create(newEntry)
        .then((updatedEntry) => {
          setPersons(persons.concat(updatedEntry));
          setNewName("");
          setNumber("");
          setSuccessMess({
            message: `Added ${newEntry.name}`,
            type: "success",
          });
          setTimeout(() => {
            setSuccessMess(null);
          }, 5000);
        })
        .catch((error) => {
          setSuccessMess({
            message: `${error.response.data.error}`,
            type: "error",
          });
          setTimeout(() => {
            setSuccessMess(null);
          }, 5000);
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

  const deletePersonHandler = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      phoneService.remove(id).then((removedRes) => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMess} />
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
      <Persons
        persons={persons}
        filtered={filtered}
        deletePersonHandler={(id) => deletePersonHandler(id)}
      />
    </div>
  );
};

export default App;
