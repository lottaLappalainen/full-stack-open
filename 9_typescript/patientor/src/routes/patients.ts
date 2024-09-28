import express, { Request, Response, NextFunction } from 'express';
import { NewEntrySchema, parseNewEntry } from '../utils';
import patientService from '../services/patientService';

import { z } from 'zod';
import { EntryWithoutId, NewPatientEntry, PatientEntry} from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatientsWithoutSsn());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewEntrySchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
  const addedEntry = patientService.addPatient(req.body);
  res.json(addedEntry);
});

router.post('/:id/entries', (req: Request, res: Response, next: NextFunction) => {
  try {
    const newEntry: EntryWithoutId = parseNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);

    if (addedEntry) {
      res.json(addedEntry);
    } else {
      res.status(404).send({ error: "Patient not found" });
    }
  } catch (error) {
    next(error);
  }
});


router.use(errorMiddleware);


export default router;