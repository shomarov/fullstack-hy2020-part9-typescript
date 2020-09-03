interface ExerciseCalculatorValues {
  target: number;
  daily_exercises: Array<number>;
}

const parseExerciseArguments = (
  args: Array<string>
): ExerciseCalculatorValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2])) && !args.slice(3).some((n) => isNaN(Number(n)))) {
    return {
      target: Number(args[2]),
      daily_exercises: args.slice(3).map((n) => Number(n))
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  target: number,
  dailyHours: Array<number>
): Result => {
  const sumOfdailyHours = dailyHours.reduce((sum, h) => {
    return sum + h;
  }, 0);
  const average = sumOfdailyHours / dailyHours.length;
  const rating = calculateRating(average);

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter((h) => h !== 0).length,
    success: average >= target,
    rating,
    ratingDescription: getRatingDescription(rating),
    target,
    average
  };
};

const calculateRating = (average: number): number => {
  if (average < 1.5) {
    return 1;
  } else if (average > 1.5 && average < 2.5) {
    return 2;
  } else return 3;
};

const getRatingDescription = (rating: number): string => {
  switch (rating) {
    case 1:
      return 'you can do better than that';
    case 2:
      return 'not too bad but could be better';
    default:
      return 'you are the best';
  }
};

try {
  const { target, daily_exercises } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(target, daily_exercises));
} catch (e) {
  const error = e as Error;
  console.log('Error, something bad happened, message:', error.message);
}

export { ExerciseCalculatorValues, calculateExercises };
