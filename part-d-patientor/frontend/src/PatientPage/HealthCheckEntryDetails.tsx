import React from 'react';
import { HealthCheckEntry } from '../types';
import { Icon, Segment } from 'semantic-ui-react';

const HealthCheckEntryDetails: React.FC<{
  entry: HealthCheckEntry;
}> = ({ entry }) => {
  const healthIconColors: Map<number, 'green' | 'yellow' | 'red'> = new Map([
    [0, 'green'],
    [1, 'yellow'],
    [2, 'red']
  ]);

  return (
    <Segment>
      <div>
        <h4>
          {entry.date} <Icon name="doctor" size="big" />
        </h4>
        <p>{entry.description}</p>
        <p>
          <Icon
            name="heart"
            color={healthIconColors.get(entry.healthCheckRating)}
          />
        </p>
      </div>
    </Segment>
  );
};

export default HealthCheckEntryDetails;
