import express from 'express';
import patientsService from '../services/patients';
import toNewPatient from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientsService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (e) {
    const err = e as Error;
    res.status(400).send(err.message);
  }
});

export default patientsRouter;
