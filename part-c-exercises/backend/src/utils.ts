import { NewPatient, Gender } from './types';

const toNewPatient = (object: Record<string, unknown>): NewPatient => {
  const newPatient = {
    name: parseName(object.name),
    ssn: parseSsn(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender)
  };

  return newPatient;
};

const parseName = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing name');
  }

  return param;
};

const parseSsn = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing ssn');
  }

  return param;
};

const parseDate = (param: unknown): string => {
  if (!param || !isString(param) || !isDate(param)) {
    throw new Error('Incorrect or missing date');
  }

  return param;
};

const parseOccupation = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing occupation');
  }

  return param;
};

const parseGender = (param: unknown): Gender => {
  if (!param || !isGender(param)) {
    throw new Error('Incorrect or missing gender');
  }

  return param;
};

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param));
};

const isGender = (param: unknown): param is Gender => {
  return Object.values(Gender).includes(param as Gender);
};

export default toNewPatient;
