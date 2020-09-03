import React from 'react';
import ReactDOM from 'react-dom';

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescription {
  name: 'The hardest parts';
  difficulty: string;
}

type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

type CourseParts = CoursePart[];

const courseName = 'Half Stack application development';

// this is the new courseParts variable
const courseParts: CoursePart[] = [
  {
    name: 'Fundamentals',
    exerciseCount: 10,
    description: 'This is an awesome course part'
  },
  {
    name: 'Using props to pass data',
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: 'Deeper type usage',
    exerciseCount: 14,
    description: 'Confusing description',
    exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev'
  },
  {
    name: 'The hardest parts',
    exerciseCount: 12,
    description: 'Deepest type usage',
    difficulty: 'Nightmare!'
  }
];

const Header: React.FC<{ name: string }> = ({ name }) => <h1>{name}</h1>;

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description}
        </p>
      );
    case 'Using props to pass data':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.groupProjectCount}
        </p>
      );
    case 'Deeper type usage':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description}{' '}
          {part.exerciseSubmissionLink}
        </p>
      );
    case 'The hardest parts':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description} {part.difficulty}
        </p>
      );
  }
};

const Content: React.FC<{ parts: CourseParts }> = ({ parts }) => (
  <>
    {parts.map((part: CoursePart) => (
      <Part part={part}>
        {part.name} {part.exerciseCount}
      </Part>
    ))}
  </>
);

const Total: React.FC<{ parts: CourseParts }> = ({ parts }) => (
  <p>
    Number of exercises{' '}
    {parts.reduce(
      (carry: number, part: CoursePart) => carry + part.exerciseCount,
      0
    )}
  </p>
);

const App: React.FC = () => {
  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
