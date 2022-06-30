const Header = ({ heading }) => {
  return <h2>{heading}</h2>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return parts.map((part) => (
    <Part key={part.id} name={part.name} exercises={part.exercises} />
  ));
};

const Total = ({ parts }) => {
  const count = parts.reduce((acc, cur) => acc + cur.exercises, 0);
  return <h3>total of {count} exercises</h3>;
};

const Course = ({ course }) => {
  const { name, parts } = course;

  return (
    <div>
      <Header heading={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default Course;
