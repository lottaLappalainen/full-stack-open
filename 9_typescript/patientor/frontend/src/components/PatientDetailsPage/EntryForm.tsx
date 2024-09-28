import React, { useState } from "react";
import axios from "axios"; 
import { EntryWithoutId } from "../../types"; 
import { apiBaseUrl } from "../../constants";

enum EntryType {
  HealthCheck = "HealthCheck",
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
}

const HealthCheckForm = ({ onSubmit }: { onSubmit: (data: EntryWithoutId) => void }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes: diagnosisCodes.split(",").map(code => code.trim()), 
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Health Check Entry</h3>
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="text" placeholder="Specialist" value={specialist} onChange={(e) => setSpecialist(e.target.value)} />
      <input type="number" placeholder="Health Check Rating" value={healthCheckRating} onChange={(e) => setHealthCheckRating(Number(e.target.value))} />
      <input type="text" placeholder="Diagnosis Codes (comma separated)" value={diagnosisCodes} onChange={(e) => setDiagnosisCodes(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

const HospitalForm = ({ onSubmit }: { onSubmit: (data: EntryWithoutId) => void }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: "Hospital",
      description,
      date,
      specialist,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
      diagnosisCodes: diagnosisCodes.split(",").map(code => code.trim()), 
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Hospital Entry</h3>
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="text" placeholder="Specialist" value={specialist} onChange={(e) => setSpecialist(e.target.value)} />
      <input type="date" placeholder="Discharge Date" value={dischargeDate} onChange={(e) => setDischargeDate(e.target.value)} />
      <input type="text" placeholder="Discharge Criteria" value={dischargeCriteria} onChange={(e) => setDischargeCriteria(e.target.value)} />
      <input type="text" placeholder="Diagnosis Codes (comma separated)" value={diagnosisCodes} onChange={(e) => setDiagnosisCodes(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

const OccupationalHealthcareForm = ({ onSubmit }: { onSubmit: (data: EntryWithoutId) => void }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: "OccupationalHealthcare",
      description,
      date,
      specialist,
      employerName,
      sickLeave: sickLeaveStart && sickLeaveEnd ? { startDate: sickLeaveStart, endDate: sickLeaveEnd } : undefined,
      diagnosisCodes: diagnosisCodes.split(",").map(code => code.trim()), 
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Occupational Healthcare Entry</h3>
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="text" placeholder="Specialist" value={specialist} onChange={(e) => setSpecialist(e.target.value)} />
      <input type="text" placeholder="Employer Name" value={employerName} onChange={(e) => setEmployerName(e.target.value)} />
      <input type="date" placeholder="Sick Leave Start" value={sickLeaveStart} onChange={(e) => setSickLeaveStart(e.target.value)} />
      <input type="date" placeholder="Sick Leave End" value={sickLeaveEnd} onChange={(e) => setSickLeaveEnd(e.target.value)} />
      <input type="text" placeholder="Diagnosis Codes (comma separated)" value={diagnosisCodes} onChange={(e) => setDiagnosisCodes(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

const EntryForm = ({ patientId }: { patientId: string }) => {
  const [selectedEntryType, setSelectedEntryType] = useState<EntryType | null>(null);

  const handleSelectEntryType = (type: EntryType) => {
    setSelectedEntryType(type);
  };

  const handleFormSubmit = async (entry: EntryWithoutId) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/patients/${patientId}/entries`, entry);
      console.log("Entry added successfully", response.data);
    } catch (error) {
      console.error("Error adding entry", error);
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <div>
        <button onClick={() => handleSelectEntryType(EntryType.HealthCheck)}>HealthCheck</button>
        <button onClick={() => handleSelectEntryType(EntryType.Hospital)}>Hospital</button>
        <button onClick={() => handleSelectEntryType(EntryType.OccupationalHealthcare)}>
          Occupational HealthCare
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {selectedEntryType === EntryType.HealthCheck && <HealthCheckForm onSubmit={handleFormSubmit} />}
        {selectedEntryType === EntryType.Hospital && <HospitalForm onSubmit={handleFormSubmit} />}
        {selectedEntryType === EntryType.OccupationalHealthcare && <OccupationalHealthcareForm onSubmit={handleFormSubmit} />}
      </div>
    </div>
  );
};

export default EntryForm;
