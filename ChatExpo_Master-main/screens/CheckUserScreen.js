import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { ActivityIndicator } from "react-native-paper";
const CheckUserScreen = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.primary,
      alignItems: "center",
    },
    image: {
      position: "absolute",
      width: SIZES.width,
      height: SIZES.height,
      resizeMode: "cover",
      zIndex: -1,
    },
    mainContainer: {
      flex: 0.95,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    centerContainer: {
      height: SIZES.height * 0.15,
      justifyContent: "space-between",
      width: SIZES.width * 0.9,
      alignItems: "center",
    },
  });
  const { container, image, mainContainer, centerContainer } = styles;
  return (
    <View style={container}>
      <Image style={image} source={require("../assets/splash.png")} />

      <View style={mainContainer}>
        <View style={centerContainer}>
          <ActivityIndicator size={"large"} color={COLORS.secondary} />
          <Text
            style={{
              ...FONTS.H2,
              color: COLORS.secondary,
              textAlign: "center",
            }}
          >
            Giriş Bilgileriniz Kontrol Ediliyor
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CheckUserScreen;
