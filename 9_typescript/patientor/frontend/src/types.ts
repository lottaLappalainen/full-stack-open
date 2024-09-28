
export interface DiagnosisEntry {
    code: string;
    name: string;
    latin?: string;
  }

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
  
    diagnosisCodes?: Array<DiagnosisEntry['code']>;
  }

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }

export interface Discharge {
    date: string;
    criteria: string;
  }

export interface SickLeave {
    startDate: string;
    endDate: string;
  }
  
interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
  }

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
  }

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;
export type NewPatientEntry = UnionOmit<Entry, 'id'>;

export type NoSsnPatientEntry = Omit<Patient, 'ssn' | 'entries'>;

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;