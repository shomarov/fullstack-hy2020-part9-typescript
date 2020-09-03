import React from 'react';
import { Entry, EntryType } from '../types';
import { useStateValue } from '../state';
import HealthCheckEntryDetails from './HealthCheckEntryDetails';
import OccupationalHealthcareEntryDetails from './OccupationalHealthcareEntryDetails';
import HospitalEntryDetails from './HospitalEntryDetails';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  if (Object.entries(diagnoses).length === 0) return null;

  const assertNever = (value: never): never => {
    throw new Error(`Malformed entry: ${JSON.stringify(value)}`);
  };

  switch (entry.type) {
    case EntryType.HealthCheck:
      return <HealthCheckEntryDetails entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case EntryType.Hospital:
      return <HospitalEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
