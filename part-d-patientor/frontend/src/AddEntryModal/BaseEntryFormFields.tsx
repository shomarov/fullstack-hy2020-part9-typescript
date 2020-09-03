import React from 'react';
import { useStateValue } from '../state';
import { EntryType } from '../types';
import { Field, FormikProps } from 'formik';
import { EntryOption, SelectEntryTypeField } from './FormField';
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';

const entryTypeOptions: EntryOption[] = [
  { value: EntryType.HealthCheck, label: 'HealthCheck' },
  { value: EntryType.OccupationalHealthcare, label: 'OccupationalHealthcare' },
  { value: EntryType.Hospital, label: 'Hospital' }
];

const BaseEntryFormFields = ({
  setFieldValue,
  setFieldTouched
}: {
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>['setFieldValue'];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>['setFieldTouched'];
}) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <>
      <SelectEntryTypeField
        label="Type"
        name="type"
        options={entryTypeOptions}
      />
      <Field
        label="Date"
        placeholder="YYYY-MM-DD"
        name="date"
        component={TextField}
      />
      <Field
        label="Specialist"
        placeholder="Name"
        name="specialist"
        component={TextField}
      />
      <DiagnosisSelection
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
        diagnoses={Object.values(diagnoses)}
      />
      <Field
        label="Description"
        placeholder="Description"
        name="description"
        component={TextField}
      />
    </>
  );
};

export default BaseEntryFormFields;
