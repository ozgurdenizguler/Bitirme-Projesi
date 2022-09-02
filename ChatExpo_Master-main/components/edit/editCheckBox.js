import { Text, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { CheckBox } from "react-native-elements";
import React from "react";

const editCheckBox = (props) => {
  return (
    <View
      style={{
        height: SIZES.base * 8,
        alignItems: "center",
        justifyContent: "space-around",
      }}
      key={props.value}
    >
      <CheckBox
        disabled={props.disabled}
        checked={props.checked}
        checkedColor={COLORS.secondary}
        size={SIZES.width * 0.0725}
        uncheckedColor={COLORS.black}
        color={props.color ? props.color : COLORS.black}
        status={props.checked ? "checked" : "unchecked"}
        onPress={() => {
          props.setChecked(props.checked ? null : props.value);
        }}
        style={{
          marginBottom: 20,
        }}
      />

      <Text
        style={{
          ...FONTS.BODY2,
          textAlign: "center",
          color: props.checked ? COLORS.secondary : COLORS.black,
        }}
      >
        {props.title}
      </Text>
    </View>
  );
};

export default editCheckBox;
