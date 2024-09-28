import patients from '../../data/patients';
import { PatientEntry, NoSsnPatientEntry, NewPatientEntry, Entry, EntryWithoutId} from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): PatientEntry[] => {
    return patients;
  };

const findById = (id: string): PatientEntry | undefined => {
    const entry = patients.find(d => d.id === id);
    return entry;
  };

const getPatientsWithoutSsn = (): NoSsnPatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
      }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    entries: [],
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry | undefined => {
  const patient = patients.find(p => p.id === patientId);
  
  if (!patient) {
    return undefined; 
  }

  const newEntry = {
    ...entry,
    id: uuid(),  
  };

  patient.entries.push(newEntry); 

  return newEntry; 
};


export default {
  getPatients,
  getPatientsWithoutSsn,
  addPatient,
  findById,
  addEntry
};