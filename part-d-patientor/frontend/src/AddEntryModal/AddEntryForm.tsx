import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import { Entry, EntryType } from '../types';
import EmployerNameField from './EmployerNameField';
import HealthCheckRatingField from './HealthCheckRatingField';
import BaseEntryFormFields from './BaseEntryFormFields';
import SickLeaveFormField from './SickLeaveFormField';
import DischargeFormField from './DischargeFormField';

export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck,
        date: '',
        specialist: '',
        diagnosisCodes: [],
        description: '',
        healthCheckRating: 0,
        employerName: '',
        sickLeave: undefined,
        'discharge.date': '',
        'discharge.criteria': ''
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const invalidDate = 'Invalid date';
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!Date.parse(values.date)) {
          errors.date = invalidDate;
        }
        if (
          !values.employerName &&
          values.type === EntryType.OccupationalHealthcare
        ) {
          errors.employerName = requiredError;
        }
        if (!values['discharge.date']) {
          errors['discharge.date'] = requiredError;
        }
        if (!values['discharge.criteria']) {
          errors['discharge.criteria'] = requiredError;
        }

        console.log(errors);

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <BaseEntryFormFields
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <HealthCheckRatingField />
            <EmployerNameField />
            <SickLeaveFormField />
            <DischargeFormField />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
