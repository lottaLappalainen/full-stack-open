import patients from '../../data/patients';
import { PatientEntry, NoSsnPatientEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): PatientEntry[] => {
    return patients;
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
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getPatientsWithoutSsn,
  addPatient
};