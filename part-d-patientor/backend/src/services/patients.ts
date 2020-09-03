import {
  Patient,
  PublicPatient,
  NewPatient,
  Entry,
  NewEntry
} from '../../src/types';
import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): PublicPatient[] => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (patient: NewPatient): PublicPatient => {
  const newPatient: Patient = {
    id: uuidv4(),
    ...patient
  };

  patients.push(newPatient);

  const { ssn: _, ...nonSensitivePatient } = newPatient;

  return nonSensitivePatient;
};

const addEntry = (id: string, entry: NewEntry): Patient | null => {
  const patient = patients.find((p) => p.id === id);

  if (!patient) return null;

  const newEntry: Entry = {
    id: uuidv4(),
    ...entry
  };

  patient.entries = patient.entries.concat(newEntry);

  return patient;
};

export default {
  getPatients,
  getPublicPatients,
  getPatient,
  addPatient,
  addEntry
};
