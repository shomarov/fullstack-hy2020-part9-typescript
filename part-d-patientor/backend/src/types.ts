export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export type NewBaseEntry = Omit<BaseEntry, 'id'>;

export interface Discharge {
  date: string;
  criteria: string;
}

export type SickLeave = {
  startDate: string;
  endDate: string;
};

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

export type NewOccupationalHealthcareEntry = Omit<
  OccupationalHealthcareEntry,
  'id'
>;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export type NewEntry =
  | NewHealthCheckEntry
  | NewOccupationalHealthcareEntry
  | NewHospitalEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Male = 'male',
  Female = 'female'
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;
