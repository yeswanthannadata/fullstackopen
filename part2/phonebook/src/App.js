import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Yeswanth", number: "91-1200938345" },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={newNameHandler}>
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
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
