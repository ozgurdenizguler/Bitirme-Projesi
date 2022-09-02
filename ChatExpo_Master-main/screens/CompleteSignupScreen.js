import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import {
  textInput,
  inlineButton,
  backTopBar,
  editCheckBox,
  datePicker,
} from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { pickImage } from "../components/functions";
import { getAuth } from "firebase/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";

const CompleteSignupScreen = ({ navigation: { goBack }, route }) => {
  const auth = getAuth();
  const navigation = useNavigation();

  console.log(firebaseUserRef);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [surname, setSurname] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [vacType, setVacType] = useState("");
  const [dose, setDose] = useState(0);
  const { completeProfile, userType, firebaseUserRef } =
    useContext(AuthContext);
  console.log(firebaseUserRef);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.primary,
    },
    inputContainer: {
      flex: 1,
      zIndex: -1,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff",
    },
    inputContainer2: {
      height: SIZES.height * 0.225,
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: SIZES.base,
    },
  });
  const { container, inputContainer2 } = styles;

  return (
    <View style={container}>
      {uploading ? (
        <Spinner visible={true} textContent={"Fotoğraf Yükleniyor"} />
      ) : null}
      <View
        style={{
          height: SIZES.height * 0.07,
          justifyContent: "center",

          alignItems: "center",
        }}
      >
        {backTopBar({
          onPress: () => navigation.goBack(),
          title: "Bilgileri Tamamla",
        })}
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: SIZES.base * 2,
          alignItems: "center",
          justifyContent: "space-around",
        }}
        style={{
          flex: 1,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            pickImage({
              setImage,
              setUploading,
              image,
              firebaseUserRef,
              userUID: auth.currentUser.uid,
              userInfo: auth.currentUser,
            })
          }
        >
          <View
            style={{
              marginVertical: SIZES.base * 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                width: SIZES.width * 0.225,
                borderWidth: 1,
                height: SIZES.width * 0.225,
                borderRadius: (SIZES.width * 0.3) / 2,
              }}
              source={image ? { uri: image } : require("../assets/illus.jpg")}
            />
            <MaterialCommunityIcons
              style={{
                position: "absolute",
                left: SIZES.width * 0.19,
                bottom: SIZES.width * 0.19,
              }}
              size={24}
              color={COLORS.secondary}
              name={"pen"}
            />
          </View>
        </TouchableOpacity>
        <View style={inputContainer2}>
          {textInput({
            label: "Ad",
            type: "outlined",
            value: name,
            defaultValue: name,
            onChangeText: (text) => setName(text),
            borderWidth: true,
          })}
          {textInput({
            label: "Soyad",
            type: "outlined",
            value: surname,
            defaultValue: surname,
            onChangeText: (text) => setSurname(text),
            borderWidth: true,
          })}
        </View>
        {userType === 1 ? (
          <View
            style={{
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: SIZES.width * 0.9,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  ...FONTS.BODY2,
                }}
              >
                Doğum Tarihi:
              </Text>
              {datePicker({ setDate, date })}
            </View>
            <View
              style={{
                flexDirection: "row",
                width: SIZES.width * 0.6,
                paddingVertical: 12,
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              {editCheckBox({
                title: "Tek Doz",
                checked: dose === 1,
                value: 1,
                setChecked: setDose,
              })}
              {editCheckBox({
                title: "Çift Doz",
                checked: dose === 2,
                value: 2,
                setChecked: setDose,
              })}
              {editCheckBox({
                title: "Üç Doz",
                checked: dose === 3,
                value: 3,
                setChecked: setDose,
              })}
            </View>
            <View
              style={{
                flexDirection: "row",
                width: SIZES.width * 0.75,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {editCheckBox({
                title: "Sinovac",
                checked: vacType === "Sinovac",
                value: "Sinovac",
                setChecked: setVacType,
              })}
              {editCheckBox({
                title: "Biontech",
                checked: vacType === "Biontech",
                value: "Biontech",
                setChecked: setVacType,
              })}
              {editCheckBox({
                title: "Olmadı",
                checked: vacType === "",
                value: "",
                setChecked: setVacType,
              })}
            </View>
          </View>
        ) : null}
      </KeyboardAwareScrollView>
      <View
        style={{
          alignItems: "center",
        }}
      >
        {inlineButton({
          onPress:
            name !== "" && surname !== "" && userType !== null
              ? () =>
                  completeProfile({
                    name: name,
                    surname: surname,
                    photoURL: image,
                    userType,
                    navigation,
                    setLoading,
                    date: date,
                    vaccination: `${vacType} - ${dose} Doz`,
                    setUploading,
                  })
              : () => {
                  showMessage({
                    message: "Please Fill all the fields",
                    type: "danger",
                  });
                },
          text: "Kaydı Tamamla",
          complete: true,
        })}
      </View>
    </View>
  );
};

export default CompleteSignupScreen;
