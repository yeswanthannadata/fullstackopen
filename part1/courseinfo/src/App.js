const Header = (props) => {
  return <h1>{props.heading}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.content.name} {props.content.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      <Part content={props.part1} />
      <Part content={props.part2} />
      <Part content={props.part3} />
    </>
  );
};

const Total = (props) => {
  return <p>No of Exercises {props.total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header heading={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
};

export default App;
