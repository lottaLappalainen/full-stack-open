const App = () => {

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }
  
  interface CoursePartBasic extends CoursePartDescription {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends CoursePartDescription {
    requirements: string[];
    kind: "special"
  }
  
  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];

  const Header = (props: { name: string }) => {
    return <h1>{props.name}</h1>
  }

  const Part = (props: { course: CoursePart }) => {
    switch (props.course.kind) {
      case "basic":
        return (<div>
          <h4>{props.course.name}</h4>
          <p>Exercise count: {props.course.exerciseCount}</p>
          <p>Description: {props.course.description}</p>
        </div>)
      case "background":
        return (<div>
          <h4>{props.course.name}</h4>
          <p>Exercise count: {props.course.exerciseCount}</p>
          <p>Background material: {props.course.backgroundMaterial}</p>
          <p>Description: {props.course.description}</p>
        </div>)
      case "group":
        return (<div>
          <h4>{props.course.name}</h4>
          <p>Exercise count: {props.course.exerciseCount}</p>
          <p>Group project count: {props.course.groupProjectCount}</p>
        </div>)
      case "special":
        return (<div>
          <h4>{props.course.name}</h4>
          <p>Exercise count: {props.course.exerciseCount}</p>
          <p>Description: {props.course.description}</p>
          <p>Requirements: {props.course.requirements.join(", ")}</p>
        </div>)
    }
  }

  const Content = (props: { courseParts: CoursePart[] }) => {
    return (
      <div>
        {props.courseParts.map((course) => (
          <div key={course.name}>
            <Part course={course} />
          </div>
        ))}
      </div>
    );
  };

  const Total = (props: { totalExercises: number }) => {
    return <p>Number of exercises: {props.totalExercises}</p>
  }

  const courseName = "Half Stack application development";
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