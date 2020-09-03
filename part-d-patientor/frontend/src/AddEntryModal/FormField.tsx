import React from 'react';
import { Field } from 'formik';
import { Form } from 'semantic-ui-react';
import { EntryType } from '../types';

export type EntryOption = {
  value: EntryType;
  label: string;
};

// props for select field component
type SelectEntryTypeFieldProps = {
  name: string;
  label: string;
  options: EntryOption[];
};

export const SelectEntryTypeField: React.FC<SelectEntryTypeFieldProps> = ({
  name,
  label,
  options
}: SelectEntryTypeFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);
