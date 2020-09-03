import React from 'react';
import { Field, useFormikContext } from 'formik';
import { TextField } from '../AddPatientModal/FormField';
import { EntryType } from '../types';

const EmployerNameField: React.FC = () => {
  const { values } = useFormikContext<{ type: EntryType }>();

  return (
    <>
      {values.type === EntryType.OccupationalHealthcare && (
        <Field
          label="Employer Name"
          name="employerName"
          component={TextField}
        />
      )}
    </>
  );
};

export default EmployerNameField;
