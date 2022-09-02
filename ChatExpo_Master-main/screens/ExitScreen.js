import React, { Component, useContext, useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { ActivityIndicator } from "react-native-paper";
import { AuthContext } from "../context/AuthContext";
const ExitScreen = () => {
  const { signOut } = useContext(AuthContext);
  useEffect(() => {
    return signOut();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: "center",
      }}
    >
      <Image
        style={{
          position: "absolute",
          width: SIZES.width,
          height: SIZES.height,
          resizeMode: "cover",
          zIndex: -1,
        }}
        source={require("../assets/splash.png")}
      />

      <View
        style={{
          flex: 0.95,
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <View
          style={{
            height: SIZES.height * 0.15,
            justifyContent: "space-between",
          }}
        >
          <ActivityIndicator size={"large"} color={"#FFF"} />
          <Text style={{ ...FONTS.H2, color: COLORS.white }}>Exiting</Text>
        </View>
      </View>
    </View>
  );
};

export default ExitScreen;
