import React, { useState } from 'react';
import { useStateValue, addEntry } from '../state';
import { useParams } from 'react-router-dom';
import EntryDetails from './EntryDetails';
import { Button, Icon } from 'semantic-ui-react';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import axios from 'axios';

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const patient = patients[id];

  if (!patient) return null;

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post(
        `http://localhost:3001/api/patients/${patient.id}/entries`,
        values
      );
      dispatch(addEntry(updatedPatient));
      closeModal();
    } catch (e) {
      setError(e.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div>
      <h3>
        {patient.name}{' '}
        {patient.gender === 'male' ? (
          <Icon name="man" />
        ) : (
          <Icon name="woman" />
        )}
      </h3>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {patient.entries.map((e) => (
        <EntryDetails key={e.id} entry={e} />
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add Entry</Button>
    </div>
  );
};

export default PatientPage;
