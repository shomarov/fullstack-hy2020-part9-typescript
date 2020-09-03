import React from 'react';
import { Field, useFormikContext } from 'formik';
import { TextField } from '../AddPatientModal/FormField';
import { EntryType } from '../types';

const SickLeaveFormField: React.FC = () => {
  const { values } = useFormikContext<{ type: EntryType }>();

  return (
    <>
      {values.type === EntryType.OccupationalHealthcare && (
        <>
          <Field
            label="Sick Leave Start Date"
            placeholder="YYYY-MM-DD"
            name="startDate"
            component={TextField}
          />
          <Field
            label="Sick Leave End Date"
            placeholder="YYYY-MM-DD"
            name="endDate"
            component={TextField}
          />
        </>
      )}
    </>
  );
};

export default SickLeaveFormField;
