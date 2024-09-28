import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Patient } from "../../types";
import { apiBaseUrl } from "../../constants";
import { Typography, Box } from "@mui/material";
import EntryDetails from "./EntryDetails";
import EntryForm from "./EntryForm";

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(response.data);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          setError(e.response?.data || "Error fetching patient details");
        } else {
          setError("Unknown error");
        }
      }
    };

    void fetchPatient();
  }, [id]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!patient) {
    return <p>Loading patient details...</p>;
  }

  return (
    <Box>
      <Typography variant="h4">{patient.name}</Typography>
      <Typography variant="body1">Gender: {patient.gender}</Typography>
      <Typography variant="body1">Ssh: {patient.ssn}</Typography>
      <Typography variant="body1">Occupation: {patient.occupation}</Typography>
      <EntryForm patientId = {patient.id}/>
      <h2>Entries</h2>
      <EntryDetails entries = {patient.entries} />
    </Box>
  );
};

export default PatientDetailsPage;
