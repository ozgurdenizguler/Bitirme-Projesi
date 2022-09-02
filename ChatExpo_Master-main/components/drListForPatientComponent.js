import React from "react";
import { COLORS, FONTS, SHADOWS, SIZES } from "../constants/theme";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const drListForPatientComponent = (props) => {
  const { title, text, onPress } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: SIZES.width * 0.95,
        marginBottom: SIZES.base * 2,
        backgroundColor: COLORS.secondary,
        borderRadius: 12,
        paddingVertical: SIZES.base * 2,
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              ...FONTS.H4,
              color: COLORS.white,
            }}
          >
            {title}:{" "}
          </Text>
          <Text
            style={{
              ...FONTS.BODY2,
              color: COLORS.white,
            }}
          >
            {text}
          </Text>
        </View>
        <TouchableOpacity onPress={onPress}>
          <MaterialCommunityIcons
            size={24}
            color={COLORS.white}
            name={"message-arrow-right-outline"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default drListForPatientComponent;
