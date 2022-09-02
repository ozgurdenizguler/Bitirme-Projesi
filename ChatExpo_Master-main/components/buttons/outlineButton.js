import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const outlineButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          backgroundColor: props.backgroundColor ?? COLORS.white,
          width: props.width ? props.width : SIZES.width * 0.9,
          height: props.height ? props.height : SIZES.height * 0.07,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: props.borderColor ? props.borderColor : COLORS.black,
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Roboto_500Medium",
              color: props.borderColor ? props.borderColor : COLORS.black,
              fontSize: 18,
            }}
          >
            {props.text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default outlineButton;
