import express from 'express';
import patientsService from '../services/patients';
import { parsePatient, parseEntry } from '../utils';
import { Patient } from '../types';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

patientsRouter.get('/:id', (req, res) => {
  const id: string = req.params.id;

  try {
    const patient: Patient | undefined = patientsService.getPatient(id);

    if (!patient) res.sendStatus(404);

    res.send(patient);
  } catch (e) {
    const err = e as Error;
    res.status(400).send({ error: err.message });
  }
});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatient = parsePatient(req.body);

    const addedPatient = patientsService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (e) {
    const err = e as Error;
    res.status(400).send({ error: err.message });
  }
});

patientsRouter.post('/:id/entries', (req, res) => {
  const id: string = req.params.id;

  try {
    const patient: Patient | undefined = patientsService.getPatient(id);

    if (!patient) res.sendStatus(404);

    const newEntry = parseEntry(req.body);

    const updatedPatient = patientsService.addEntry(id, newEntry);

    res.json(updatedPatient);
  } catch (e) {
    const err = e as Error;
    res.status(400).send({ error: err.message });
  }
});

export default patientsRouter;
