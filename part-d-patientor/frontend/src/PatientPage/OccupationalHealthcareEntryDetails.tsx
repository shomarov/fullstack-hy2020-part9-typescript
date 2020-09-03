import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { Icon, Segment } from 'semantic-ui-react';

const OccupationalHealthcareEntryDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => (
  <Segment>
    <div>
      <h4>
        {entry.date} <Icon name="stethoscope" size="big" /> {entry.employerName}
      </h4>
      <p>{entry.description}</p>
    </div>
  </Segment>
);

export default OccupationalHealthcareEntryDetails;
