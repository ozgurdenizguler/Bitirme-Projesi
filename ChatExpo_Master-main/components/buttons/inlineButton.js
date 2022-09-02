import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";

const inlineButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          height: SIZES.height * 0.07,
          borderColor: props.complete ? "white" : COLORS.black,
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : COLORS.secondary,
          borderWidth: props.complete ? 1 : 0,
          width: props.width ? props.width : SIZES.width * 0.9,
          borderRadius: 10,
          alignItems: "center",
          zIndex: 1,
          justifyContent: "center",
          backfaceVisibility: "hidden",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Roboto_500Medium",
            color: props.complete ? COLORS.white : COLORS.buttonText,
            fontSize: 20,
          }}
        >
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default inlineButton;
