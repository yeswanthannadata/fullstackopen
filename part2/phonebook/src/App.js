import { useState } from "react";

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

const Persons = ({ persons }) => {
  return persons.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}
    </p>
  ));
};

const App = () => {
  const personData = [
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ];
  const [persons, setPersons] = useState(personData);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filtered, setFilter] = useState("");

  const newNameHandler = (event) => {
    event.preventDefault();
    const isExist = persons.some((person) => person.name === newName);
    const isNumberExist = persons.some((person) => person.number === number);

    if (isExist) {
      alert(`${newName} is already added to phonebook`);
    } else if (isNumberExist) {
      alert(`${number} is already added to phonebook`);
    } else {
      const newEntry = { name: newName, number: number };
      setPersons(persons.concat(newEntry));
    }
    setNewName("");
    setNumber("");
  };

  const nameChangeHandler = (event) => {
    setNewName(event.target.value);
  };

  const numberChangeHandler = (event) => {
    setNumber(event.target.value);
  };

  const filterChangeHandler = (event) => {
    setFilter(event.target.value);
    const filteredPersons = personData.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setPersons(filteredPersons);
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
      <Persons persons={persons} />
    </div>
  );
};

export default App;
