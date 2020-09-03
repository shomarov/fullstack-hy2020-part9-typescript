import express from 'express';
import { BmiValues, calculateBmi } from './bmiCalculator';
import {
  ExerciseCalculatorValues,
  calculateExercises
} from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    if (Object.keys(req.query).length < 2)
      throw new Error('Not enough arguments');

    if (Object.keys(req.query).length > 2)
      throw new Error('Too many arguments');

    const query = req.query as unknown;
    const { height, weight } = query as BmiValues;

    if (isNaN(height) || isNaN(weight))
      throw new Error('malformatted parameters');

    const bmi = calculateBmi(height, weight);

    res.send({
      weight,
      height,
      bmi
    });
  } catch (e) {
    const err = e as Error;
    res.status(400).json({ error: err.message });
  }
});

app.post('/exercises', (req, res) => {
  try {
    const { daily_exercises, target } = req.body as ExerciseCalculatorValues;

    if (!daily_exercises || !target) throw new Error('parameters missing');
    if (daily_exercises.some((e) => isNaN(e)) || isNaN(target))
      throw new Error('malformatted parameters');

    const result = calculateExercises(target, daily_exercises);

    res.send(result);
  } catch (e) {
    const err = e as Error;
    res.status(400).json({ error: err.message });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
