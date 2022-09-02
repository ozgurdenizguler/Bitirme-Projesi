import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FONTS, SIZES } from "../../constants/theme";

const signScreensTopBar = (props) => {
  const { title, onPress } = props;
  return (
    <View
      style={{
        paddingVertical: SIZES.height * 0.02,
        width: SIZES.width,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderBottomWidth: 1,
        marginBottom: SIZES.height * 0.025,
      }}
    >
      <View
        style={{
          width: SIZES.width * 0.9,
          position: "absolute",
          alignItems: "flex-start",
        }}
      >
        <TouchableOpacity onPress={onPress}>
          <MaterialCommunityIcons size={SIZES.width*.09} name={"chevron-left"} />
        </TouchableOpacity>
      </View>


      <Text
        style={{
          textAlign: "center",
          ...FONTS.BODY1
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default signScreensTopBar;
