import { Patient, NonSensitivePatient, NewPatient } from '../../src/types';
import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): NonSensitivePatient => {
  const newPatient: Patient = {
    ...patient,
    id: uuidv4()
  };

  patients.push(newPatient);

  const { ssn: _, ...nonSensitivePatient } = newPatient;

  return nonSensitivePatient;
};

export default {
  getNonSensitivePatients,
  addPatient
};
