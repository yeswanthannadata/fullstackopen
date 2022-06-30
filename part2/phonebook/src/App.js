import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Yeswanth" }]);
  const [newName, setNewName] = useState("");

  const newNameHandler = (event) => {
    event.preventDefault();
    const newEntry = { name: newName };
    setPersons(persons.concat(newEntry));
    setNewName("");
  };

  const nameChangeHandler = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={newNameHandler}>
        <div>
          name: <input value={newName} onChange={nameChangeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
