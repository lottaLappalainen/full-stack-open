import { Entry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import WorkIcon from "@mui/icons-material/Work";

interface Props {
  entries: Entry[];
}

const EntryDetails = ({ entries }: Props) => {
  const getIconForEntryType = (type: Entry["type"]) => {
    switch (type) {
      case "Hospital":
        return <LocalHospitalIcon />;
      case "HealthCheck":
        return <MonitorHeartIcon />;
      case "OccupationalHealthcare":
        return <WorkIcon />;
      default:
        return null;
    }
  };

  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.id} style={{ marginBottom: "1em" }}>
          <p>
          {entry.date} {getIconForEntryType(entry.type)}
          </p>
          <em>{entry.description}</em>
          <p>Diagnosed by: {entry.specialist}</p>
        </div>
      ))}
    </div>
  );
};

export default EntryDetails;
