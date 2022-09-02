import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "react-native-paper";

const backTopBar = (props) => {
  const { onPress, title } = props;
  return (
    <View
      style={{
        alignItems: "flex-start",
        width: SIZES.width,
        paddingVertical: SIZES.base * 2,
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={{
          zIndex: 999,
        }}
        onPress={onPress}
      >
        <MaterialCommunityIcons
          color={"black"}
          style={{
            left: SIZES.base * 2,
          }}
          name={"chevron-left"}
          size={32}
        />
      </TouchableOpacity>
      <View
        style={{
          position: "absolute",
          width: SIZES.width,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            ...FONTS.H2,
            zIndex: -1,
            color: COLORS.secondary,

            textAlign: "center",
            alignSelf: "center",
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

export default backTopBar;
