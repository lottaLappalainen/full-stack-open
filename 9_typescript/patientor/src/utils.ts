import { NewPatientEntry, Gender, EntryWithoutId } from "./types";
import { z } from "zod";

const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.number().int().min(0).max(3),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

export const EntrySchema = z.union([HealthCheckEntrySchema, HospitalEntrySchema, OccupationalHealthcareEntrySchema]);

export const parseNewEntry = (object: unknown): EntryWithoutId => {
  return EntrySchema.parse(object);
};


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