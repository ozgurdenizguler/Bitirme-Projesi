import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useDimensions } from "@react-native-community/hooks";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { outlineButton } from "../components";
import { useNavigation } from "@react-navigation/native";

const PatientMain = ({ navigation: { goBack } }) => {
  const { width, height } = useDimensions().window;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.primary,
    },
    inputContainer: {
      flex: 1,
      height: height * 0.65,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff",
    },
    inputContainer2: {
      alignItems: "center",
      justifyContent: "space-between",
      height: height * 0.525,
      marginVertical: SIZES.base,
    },
    policyTextContainer: {
      width: width * 0.9,
      height: SIZES.width * 0.145,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    policyFirstTextContainer: {
      flexDirection: "row",
      height: SIZES.height * 0.05,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  const navigation = useNavigation();
  const { container } = styles;

  return (
    <View style={container}>
      <View
        style={{
          flex: 1,
          paddingVertical: SIZES.base * 2,
          alignItems: "center",
          justifyContent: "space-around",

          backgroundColor: "#fff",
        }}
      >
        <Text
          style={{
            ...FONTS.H1,
            color: COLORS.secondary,
          }}
        >
          Hoşgeldiniz
        </Text>
        <Image
          source={require("../assets/logoText.png")}
          resizeMode="contain"
          style={{
            flex: 0.3,
            width: SIZES.width * 0.7,
            height: SIZES.height * 0.2,
          }}
        />
        <Image
          source={require("../assets/illus.png")}
          resizeMode="contain"
          style={{
            flex: 0.6,
            width: SIZES.width * 0.9,
            height: SIZES.height * 0.85,
          }}
        />

        <View
          style={{
            flex: 0.15,
            alignItems: "center",

            width: SIZES.width * 0.95,
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          {outlineButton({
            text: "Giriş Yap",
            onPress: () => {
              navigation.navigate("LoginScreen");
            },
            textColor: COLORS.white,
            borderColor: COLORS.white,
            backgroundColor: COLORS.secondary,

            width: SIZES.width * 0.425,
            iconBackground: COLORS.green,
          })}
          {outlineButton({
            text: "Kayıt Ol",
            onPress: () => {
              navigation.navigate("SignupScreen");
            },
            textColor: "#fff",
            width: SIZES.width * 0.425,
            borderColor: COLORS.white,

            backgroundColor: COLORS.secondary,
            iconBackground: COLORS.green,
          })}
        </View>
      </View>
    </View>
  );
};

export default PatientMain;
