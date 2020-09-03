import {
  NewPatient,
  Gender,
  NewEntry,
  HealthCheckRating,
  SickLeave,
  Discharge
} from './types';

const parsePatient = (object: Record<string, unknown>): NewPatient => {
  const newPatient = {
    name: parseName(object.name),
    ssn: parseSsn(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    entries: []
  };

  return newPatient;
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(`Unexpected object: ${JSON.stringify(value)}`);
};

const parseEntry = (object: NewEntry): NewEntry => {
  console.log(object);
  switch (object.type) {
    case 'HealthCheck':
      return {
        type: 'HealthCheck',
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    case 'OccupationalHealthcare':
      return {
        type: 'OccupationalHealthcare',
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave)
      };
    case 'Hospital':
      return {
        type: 'Hospital',
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        discharge: parseDischarge(object.discharge)
      };
    default:
      return assertNever(object);
  }
};

const parseSickLeave = (param: unknown): SickLeave | undefined => {
  if (!param) {
    return;
  }

  if (!isSickLeave(param)) {
    throw new Error('Incorrect sick leave');
  }

  return param === undefined
    ? param
    : {
        startDate: parseDate(param.startDate),
        endDate: parseDate(param.endDate)
      };
};

const isSickLeave = (param: unknown): param is SickLeave => {
  return (
    typeof param === 'object' &&
    param !== null &&
    'startDate' in param &&
    'endDate' in param
  );
};

const isDischarge = (param: unknown): param is Discharge => {
  return (
    typeof param === 'object' &&
    param !== null &&
    'date' in param &&
    'criteria' in param
  );
};

const parseEmployerName = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing employer name');
  }

  return param;
};

const parseDischarge = (param: unknown): Discharge => {
  if (!param || !isDischarge(param)) {
    throw new Error('Incorrect or missing discharge parameter');
  }

  return {
    date: parseDate(param.date),
    criteria: parseCriteria(param.criteria)
  };
};

const parseCriteria = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing criteria');
  }

  return param;
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

const isGender = (param: unknown): param is Gender => {
  return Object.values(Gender).includes(param as Gender);
};

const parseDescription = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing description');
  }

  return param;
};

const parseSpecialist = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing specialist');
  }

  return param;
};

const parseDiagnosisCodes = (param: unknown): string[] => {
  if (!param || !Array.isArray(param) || !isArrayOfString(param)) {
    throw new Error('Incorrect or missing diagnosis codes');
  }

  return param;
};

const parseHealthCheckRating = (param: unknown): HealthCheckRating => {
  if (
    param === undefined ||
    param === null ||
    !isNumber(param) ||
    !isHealthCheckRating(param)
  ) {
    throw new Error('Incorrect or missing healthcheck rating');
  }

  return param;
};

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const isNumber = (param: unknown): param is number => {
  return Number.isInteger(param);
};

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param));
};

const isArrayOfString = (param: Array<unknown>): param is string[] => {
  return param.every((e) => typeof e === 'string');
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  console.log('param', param);
  return param >= 0 && param <= 3;
};

export { parsePatient, parseEntry };
