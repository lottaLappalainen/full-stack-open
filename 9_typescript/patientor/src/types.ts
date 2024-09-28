export interface DiagnosisEntry {
    code: string;
    name: string;
    latin?: string;
  }

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export interface NoSsnPatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
}