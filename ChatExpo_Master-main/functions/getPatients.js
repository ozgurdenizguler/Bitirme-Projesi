import { collection, getDocs } from "firebase/firestore";

export const getPatients = async (props) => {
  const { firestore, setPatients } = props;
  const ref = await collection(firestore, "patients");
  const patients = await getDocs(ref);
  const data = [];
  patients.forEach((patient) => {
    data.push(patient.data());
  });
  setPatients(data);
};
