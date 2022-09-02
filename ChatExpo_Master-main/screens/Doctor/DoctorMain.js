import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";
import { ActivityIndicator } from "react-native-paper";
import { mainScreenTopBar, patientsList } from "../../components";
import { AuthContext } from "../../context/AuthContext";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useIsFocused, useNavigation } from "@react-navigation/native";
const DoctorMain = () => {
  const { signOut, data } = useContext(AuthContext);
  const navigation = useNavigation();
  const auth = getAuth();
  const firestore = getFirestore();

  const [loading, setLoading] = React.useState(true);
  const [patients, setPatients] = React.useState([]);
  const isFocused = useIsFocused();
  console.log(data);

  useEffect(() => {
    data?.patients?.forEach((patient) => {
      const ref = doc(firestore, `patients/${patient}`);
      const get = getDoc(ref);
      const arr = [];

      get.then((doc) => {
        arr.push(doc.data());
        setPatients(arr);
      });
    });
    setLoading(false);
  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {mainScreenTopBar({
        image: data?.photoURL?.length > 0 ? data?.photoURL : "",
        title: `Dr. ${data?.name}`,
        onPress: () => signOut(),
      })}
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color={COLORS.secondary} />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.BODY2,
              color: COLORS.secondary,
              paddingVertical: 12,
            }}
          >
            {data?.workplace} Nolu Aile Sağlığı Merkezi
          </Text>
          {patientsList({
            data: patients,
            navigation,
          })}
        </View>
      )}
    </View>
  );
};

export default DoctorMain;
