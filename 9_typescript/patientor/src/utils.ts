import { NewPatientEntry, Gender } from "./types";
import { z } from 'zod';

export const NewEntrySchema = z.object({
  name: z.string(),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  occupation: z.string()
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewEntrySchema.parse(object);
};