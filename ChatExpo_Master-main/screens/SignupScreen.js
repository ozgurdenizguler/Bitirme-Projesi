import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useDimensions } from "@react-native-community/hooks";
import { AuthContext } from "../context/AuthContext";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { textInput, inlineButton, backTopBar } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";

const SignupScreen = ({ navigation: { goBack } }) => {
  const { userType, setUserType } = useContext(AuthContext);
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([
    {
      id: 0,
      type: "Doktor",
    },
    {
      id: 1,
      type: "Hasta",
    },
    {
      id: 2,
      type: "Filyasyon",
    },
  ]);
  const [selected, setSelected] = React.useState(0);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [validationID, setValidationID] = useState("");
  const [isDoctorValid, setIsDoctorValid] = useState(false);
  const { signUp, validateIDs } = useContext(AuthContext);
  const [workPlace, setWorkPlace] = useState("");
  useEffect(() => {
    if (userType === 0) {
      validateIDs.map((id) => {
        if (id.doctors.includes(validationID)) {
          setIsDoctorValid(true);
          setWorkPlace(`${id.centerRegion} , ${id.centerNo}`);
        } else {
          return setIsDoctorValid(false);
        }
      });
    } else if (userType === 2) {
      validateIDs.map((id) => {
        if (id.personals.includes(validationID)) {
          setIsDoctorValid(true);
          setWorkPlace(`${id.centerRegion} , ${id.centerNo}`);
        } else {
          return setIsDoctorValid(false);
        }
      });
    } else {
      return setIsDoctorValid(true);
    }
  }, [userType, validationID]);
  console.log(workPlace);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.primary,
      paddingBottom: SIZES.base * 2,
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
      height:
        userType === 0 || userType === 2
          ? SIZES.height * 0.325
          : SIZES.height * 0.225,

      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: SIZES.base,
    },
  });
  console.log(email);
  const { container, inputContainer2 } = styles;
  return (
    <View style={container}>
      <View
        style={{
          height: SIZES.height * 0.07,
          justifyContent: "center",

          alignItems: "center",
        }}
      >
        {backTopBar({
          onPress: () => navigation.goBack(),
          title: "Kayıt Ol",
        })}
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            width: SIZES.width * 0.9,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9991,
          }}
        >
          <Text
            style={{
              ...FONTS.BODY2,
            }}
          >
            Üyelik tipini seçiniz
          </Text>
          <DropDownPicker
            searchPlaceholder={"Kullanıcı Tipi Seçiniz"}
            listItemContainerStyle={{
              borderRadius: 10,
              alignItems: "center",
              backgroundColor: "#fff",
              borderColor: COLORS.secondary,
              borderBottomWidth: 0,
              zIndex: 999,
            }}
            style={{
              width: SIZES.width * 0.9,
              alignItems: "center",
              justifyContent: "center",
              zIndex: 999,
              borderColor: "white",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.secondary,
            }}
            itemKey={"id"}
            placeholder={"Gider Seçiniz"}
            schema={{
              label: "type",
              value: "id",
              keyExtractor: (item) => item.id,
              multiple: false,
            }}
            listItemLabelStyle={{
              ...FONTS.BODY2,
            }}
            labelStyle={{
              ...FONTS.BODY2,
            }}
            open={open}
            value={selected}
            items={data}
            onChangeValue={(item) => {
              setUserType(item);
            }}
            setOpen={() => setOpen(!open)}
            setValue={(value) => {
              setSelected(value);
            }}
            setItems={(items) => setData(items)}
          />
        </View>

        <View style={inputContainer2}>
          {textInput({
            label: "Email",
            type: "outlined",
            value: email,
            onChangeText: (text) => setEmail(text),
            borderWidth: true,
          })}

          {userType === 0 || userType === 2
            ? textInput({
                label: "Sicil No",
                value: validationID,
                onChangeText: (text) => setValidationID(text),
              })
            : null}
          {textInput({
            icon: "lock",
            label: "Şifre",
            value: password,
            onChangeText: (text) => setPassword(text),
            secureTextEntry: secureTextEntry,
            rightIcon: true,
            onPress: () => setSecureTextEntry(!secureTextEntry),
          })}
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          alignItems: "center",
        }}
      >
        {inlineButton({
          onPress: !isDoctorValid
            ? () =>
                showMessage({
                  message: "Lütfen geçerli bir sicil numarası giriniz",
                  type: "danger",
                })
            : email !== "" && password !== "" && userType !== null
            ? () =>
                signUp({
                  email,
                  password,
                  userType,
                  validationID,
                  workPlace,
                })
            : () => {
                showMessage({
                  message: "Please Fill all the fields",
                  type: "danger",
                });
              },
          text: "Kayda Devam Et",
          complete: true,
        })}
      </View>
    </View>
  );
};

export default SignupScreen;
