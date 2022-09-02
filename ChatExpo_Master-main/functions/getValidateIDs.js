import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const getValidateIDs = async (props) => {
  const { firestore, setData, personalType, id, docID } = props;
  const ref = await collection(firestore, "healthCenters");
  const get = await getDocs(ref);
  get.forEach((data) => {
    const arr = [];

    arr.push({
      id: data.id,
      ...data.data(),
    });
    setData(arr);
  });
};
