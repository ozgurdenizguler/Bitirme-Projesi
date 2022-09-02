import React from "react";

import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useKeyboard } from "@react-native-community/hooks";

import { COLORS, LAYOUT } from "../constants/theme";
import { AuthProvider } from "./AuthContext";
import Routes from "./Routes";
import FlashMessage from "react-native-flash-message";

const Providers = () => {
  return (
    <SafeAreaView style={LAYOUT.setFlex1}>
      <AuthProvider>
        <Routes />
        <FlashMessage position="top" />

        <StatusBar animated={true} />
      </AuthProvider>
    </SafeAreaView>
  );
};

export default Providers;
