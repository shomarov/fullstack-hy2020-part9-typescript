import React from 'react';
import { Field, useFormikContext } from 'formik';
import { NumberField } from '../AddPatientModal/FormField';
import { EntryType } from '../types';

const HealthCheckRatingField: React.FC = () => {
  const { values } = useFormikContext<{ type: EntryType }>();

  return (
    <>
      {values.type === EntryType.HealthCheck && (
        <Field
          label="healthCheckRating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      )}
    </>
  );
};

export default HealthCheckRatingField;
