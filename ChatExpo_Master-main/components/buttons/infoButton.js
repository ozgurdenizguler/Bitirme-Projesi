import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SHADOWS, SIZES } from "../../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const infoButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          paddingHorizontal: SIZES.width * 0.025,
          backgroundColor: props.color ? props.color : "transparent",
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          borderColor: COLORS.secondary,
          borderWidth: 2,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: SIZES.width * 0.05,
            paddingVertical: SIZES.height * 0.01,
            alignItems: "center",
          }}
        >
          {props.icon !== "" ? (
            <MaterialCommunityIcons
              size={SIZES.width * 0.0575}
              name={`${props.icon}`}
              color={"black"}
              style={{ marginRight: 5 }}
            />
          ) : null}

          <Text style={{ ...FONTS.H4, color: "white" }}>{props.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default infoButton;
