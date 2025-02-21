const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Part = ({ name, exercises }) => {
  return <p>{name} {exercises}</p>;
};

const Course = ({ course }) => {
  const parts = course.parts.map((part) => {
    return <Part key={part.name} name={part.name} exercises={part.exercises} />;
  });

  const totalExercises = course.parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);

  return (
    <>
      <Header name={course.name} />
      {parts}
      <p><b>total of {totalExercises} exercises</b></p>
    </>
  );
};

export default Course;
