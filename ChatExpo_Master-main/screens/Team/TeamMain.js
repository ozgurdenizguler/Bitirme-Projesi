import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { mainScreenTopBar, patientsList } from "../../components";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { COLORS, FONTS } from "../../constants/theme";

const TeamMain = () => {
  const { signOut, data } = useContext(AuthContext);
  const firestore = getFirestore();
  const navigation = useNavigation();
  const [patients, setPatients] = React.useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    const arr = [];
    data?.patients?.forEach((patient) => {
      const ref = doc(firestore, `patients/${patient}`);
      const get = getDoc(ref);

      get
        .then((doc) => {
          arr.push(doc.data());
        })
        .then(() => {
          setPatients(arr);
        })
        .catch(() => {
          console.log("error");
        });
    });
  }, [isFocused]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      {mainScreenTopBar({
        title: data?.name,
        image: data?.photoURL?.length > 0 ? data?.photoURL : "",
        onPress: () => signOut(),
      })}
      <Text
        style={{
          ...FONTS.H4,
          paddingVertical: 20,
          color: COLORS.secondary,
        }}
      >
        {data?.workplace} Nolu Aile Sağlığı Merkezi
      </Text>

      {patientsList({
        data: patients,
        navigation,
        team: true,
      })}
    </View>
  );
};

export default TeamMain;
