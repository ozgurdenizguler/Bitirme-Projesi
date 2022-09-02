import React, { useEffect } from "react";
import { Text, View } from "react-native";
import {
  backButton,
  datePicker,
  editCheckBox,
  infoBar,
  inlineButton,
} from "../../components";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import patientTopBar from "../../components/patientTopBar";
import moment from "moment";
import { showMessage } from "react-native-flash-message";

const PatientDetailsScreen = ({ route }) => {
  const firestore = getFirestore();
  const navigation = useNavigation();
  const [patient, setPatient] = React.useState([]);
  const [testDate, setTestDate] = React.useState(new Date());
  const [resultDate, setResultDate] = React.useState(new Date());
  const [testResult, setTestResult] = React.useState(null);
  const [doctor, setDoctor] = React.useState(null);
  console.log(patient);
  const getPatient = async () => {
    const ref = await doc(firestore, `patients/${route?.params?.id}`);
    const patients = await getDoc(ref);
    if (patients.data()) {
      setPatient(patients.data());
      setTestDate(
        patients.data().testDate
          ? new Date(patients.data()?.testDate?.toDate())
          : new Date()
      );
      setResultDate(
        patients.data().resultDate
          ? new Date(patients.data()?.resultDate?.toDate())
          : new Date()
      );
      setTestResult(
        patients.data().testResult ? patients.data().testResult : null
      );
    }
  };
  useEffect(() => {
    if (route?.params?.id) {
      getPatient();
    }
  }, [route?.params?.id]);

  useEffect(() => {
    if (patient?.doctorID) {
      const ref = doc(firestore, `doctors/${patient?.doctorID}`);
      const get = getDoc(ref);
      get.then((doc) => {
        if (doc.data()) {
          setDoctor(doc.data());
        }
      });
    }
  }, [patient?.doctorID]);
  const updatePatient = async () => {
    const ref = await doc(firestore, `patients/${route?.params?.id}`);
    const patients = await getDoc(ref);
    const update = await updateDoc(ref, {
      testDate: testDate,
      resultDate: testResult === 2 ? null : resultDate,
      testResult: testResult,
    })
      .then((res) => {
        showMessage({
          message: "Bilgiler başarıyla güncellendi",
          type: "success",
        });
      })
      .catch((err) => {
        showMessage({
          message: "Bilgiler güncellenirken hata oluştu",
          type: "danger",
        });
      });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      {patientTopBar({
        patient,
        navigation,
      })}

      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: SIZES.base * 2,
        }}
      >
        <Text
          style={{
            ...FONTS.H2,
            marginBottom: SIZES.base * 2,
          }}
        >
          {patient?.name} {patient?.surname}
        </Text>

        {infoBar({
          title: "Doğum Tarihi:",

          text: moment(patient?.birthday?.toDate()).format("DD/MM/YY"),
        })}
        {infoBar({
          title: "Aşı Bilgileri:",

          text: patient?.vaccination,
        })}
        {infoBar({
          title: "Doktor:",

          text: doctor?.name,
        })}
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",

            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.H3,
              marginBottom: SIZES.base * 2,
            }}
          >
            Test Bilgileri
          </Text>
          <View
            style={{
              width: SIZES.width * 0.8,

              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: SIZES.base * 2,

              flexDirection: "row",
            }}
          >
            <Text
              style={{
                ...FONTS.BODY2,
              }}
            >
              Test Tarihi:
            </Text>
            {datePicker({
              date: testDate,
              setDate: setTestDate,
              title: "",
            })}
          </View>
          <View
            style={{
              width: SIZES.width * 0.8,
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                ...FONTS.BODY2,
              }}
            >
              Test Sonuç Tarihi:
            </Text>
            {datePicker({
              date: resultDate,
              setDate: setResultDate,
              title: "Test Sonuç Tarihi:",
            })}
          </View>
          <View
            style={{
              height: SIZES.height * 0.1,
              width: SIZES.width * 0.95,
              marginVertical: SIZES.base * 2,
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Text
              style={{
                ...FONTS.BODY2,
                marginBottom: SIZES.base * 2,
              }}
            >
              Test Sonuç
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                width: SIZES.width * 0.6,
              }}
            >
              {editCheckBox({
                title: "Pozitif",
                checked: testResult === 1,
                value: 1,
                setChecked: setTestResult,
              })}

              {editCheckBox({
                title: "Negatif",
                checked: testResult === 0,
                value: 0,
                setChecked: setTestResult,
              })}
              {editCheckBox({
                title: "Yeni Test",
                checked: testResult === 2,
                value: 2,
                setChecked: setTestResult,
              })}
            </View>
          </View>
        </View>
        <View>
          {inlineButton({
            text: "Kaydet",
            onPress: () => updatePatient(),
          })}
        </View>
      </View>
    </View>
  );
};

export default PatientDetailsScreen;
