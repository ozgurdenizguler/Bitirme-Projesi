import React, { useState } from "react";
import { Text, View } from "react-native";
import { accordion, backButton } from "../components";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import SECTIONS from "../data/sssData";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FAQ = ({ navigation: { goBack } }) => {
  const [activeSections, setActiveSections] = useState([]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.white,
      }}
    >
      <View
        style={{
          height: SIZES.height * 0.085,
          paddingHorizontal: SIZES.base * 2,
          flexDirection: "row",
          width: SIZES.width,
          backgroundColor: COLORS.secondary,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.secondary,
            alignItems: "center",
          }}
        >
          {backButton({
            onPress: () => goBack(),
          })}
        </View>
        <Text
          style={{
            ...FONTS.H3,
            width: SIZES.width,
            position: "absolute",
            textAlign: "center",
            color: COLORS.white,
            zIndex: -1,
          }}
        >
          Sıkça Sorulan Sorular
        </Text>
        <MaterialCommunityIcons
          color={"white"}
          size={28}
          name={"head-question-outline"}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginTop: SIZES.base * 2,
        }}
      >
        {accordion({
          activeSections,
          setActiveSections,
          SECTIONS: SECTIONS,
        })}
      </View>
    </View>
  );
};

export default FAQ;
