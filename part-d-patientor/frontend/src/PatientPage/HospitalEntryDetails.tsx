import React from 'react';
import { HospitalEntry } from '../types';
import { Icon, Segment } from 'semantic-ui-react';

const HospitalEntryDetails: React.FC<{
  entry: HospitalEntry;
}> = ({ entry }) => (
  <Segment>
    <div>
      <h4>
        {entry.date} <Icon name="hospital" size="big" />
      </h4>
      <p>{entry.description}</p>
    </div>
  </Segment>
);

export default HospitalEntryDetails;
