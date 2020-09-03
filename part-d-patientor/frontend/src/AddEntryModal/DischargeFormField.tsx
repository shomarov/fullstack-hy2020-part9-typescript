import React from 'react';
import { Field, useFormikContext } from 'formik';
import { TextField } from '../AddPatientModal/FormField';
import { EntryType } from '../types';

const DischargeFormField: React.FC = () => {
  const { values } = useFormikContext<{ type: EntryType }>();

  return (
    <>
      {values.type === EntryType.Hospital && (
        <>
          <Field
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            name="['discharge.date']"
            component={TextField}
          />
          <Field
            label="Discharge Criteria"
            placeholder="Discharge Criteria"
            name="['discharge.criteria']"
            component={TextField}
          />
        </>
      )}
    </>
  );
};

export default DischargeFormField;
