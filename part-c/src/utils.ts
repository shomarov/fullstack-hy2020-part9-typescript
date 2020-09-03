import { NewDiaryEntry, Weather, Visibility } from './types';

const toNewDiaryEntry = (object: Record<string, unknown>): NewDiaryEntry => {
  const newDiaryEntry: NewDiaryEntry = {
    date: parseDate(object.date),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility),
    comment: parseComment(object.comment)
  };

  return newDiaryEntry;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }

  return date;
};

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isWeather(weather)) {
    throw new Error('Incorrect or missing weather');
  }

  return weather;
};

const isWeather = (param: unknown): param is Weather => {
  return Object.values(Weather).includes(param as Weather);
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
    throw new Error('Incorrect or missing visibility');
  }

  return visibility;
};

const isVisibility = (param: unknown): param is Visibility => {
  return Object.values(Visibility).includes(param as Visibility);
};

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
};

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param));
};

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

export default toNewDiaryEntry;
