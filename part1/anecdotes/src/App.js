import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Anecdote = ({ anecdote, votes }) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const randomSelection = () => {
    const value = Math.floor(Math.random() * anecdotes.length);
    setSelected(value);
  };

  const voteHandler = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  const famousAnecdote = () => {
    const maxVote = Math.max(...votes);
    const maxIndex = votes.indexOf(maxVote);
    return {
      anecdote: anecdotes[maxIndex],
      votes: votes[maxIndex],
    };
  };

  return (
    <>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={voteHandler} text="vote" />
      <Button onClick={randomSelection} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <Anecdote
        anecdote={famousAnecdote().anecdote}
        votes={famousAnecdote().votes}
      />
    </>
  );
};

export default App;
