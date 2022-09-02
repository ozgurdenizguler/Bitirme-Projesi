import { Text, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { backButton } from "./buttons";
import React from "react";

const patientTopBar = (props) => {
  const { navigation, patient } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        width: SIZES.width,
        height: SIZES.height * 0.1,
        paddingHorizontal: SIZES.base,
        backgroundColor: COLORS.secondary,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View>
        {backButton({
          onPress: () => {
            navigation.goBack();
          },
        })}
      </View>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          width: SIZES.width,
          zIndex: -1,
        }}
      >
        <Text
          style={{
            ...FONTS.H3,
            fontSize: 20,
            color: COLORS.white,
          }}
        >
          HASTA BİLGİLERİ
        </Text>
      </View>
    </View>
  );
};

export default patientTopBar;
