import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme";

const backButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          borderColor: COLORS.black,
        }}
      >
        <MaterialCommunityIcons
          color={COLORS.white}
          name={"chevron-left"}
          size={SIZES.width * 0.1}
        />
      </View>
    </TouchableOpacity>
  );
};

export default backButton;
