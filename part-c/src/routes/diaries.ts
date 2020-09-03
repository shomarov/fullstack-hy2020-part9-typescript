import express from 'express';
import diaryService from '../services/diaryService';
import { NewDiaryEntry } from '../types';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newDiaryEntry: NewDiaryEntry = toNewDiaryEntry(req.body);

    const addedEntry = diaryService.addEntry(newDiaryEntry);
    res.json(addedEntry);
  } catch (e) {
    const err = e as Error;
    res.status(400).send(err.message);
  }
});

export default router;
