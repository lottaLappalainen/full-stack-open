const App = () => {

  interface CoursePart {
    name: string;
    exerciseCount: number;
  }

  const Header = (props: { name: string }) => {
    return <h1>{props.name}</h1>
  }

  const Content = (props: { courseParts: CoursePart[] }) => {
    return (
      <div>
        {props.courseParts.map((course) => (
          <div key={course.name}>
            <p>{course.name}: {course.exerciseCount}</p>
          </div>
        ))}
      </div>
    );
  };

  const Total = (props: { totalExercises: number }) => {
    return <p>{props.totalExercises}</p>
  }

  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;