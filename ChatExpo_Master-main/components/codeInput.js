import React from "react";
import { TextInput } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";

const codeInput = (props) => {
  return (
    <TextInput
      ref={props.ref}
      textAlign="center"
      multiline={false}
      numberOfLines={10}
      maxLength={1}
      style={{
        borderRadius: 10,
        paddingBottom: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: SIZES.width * 0.125,
        height: SIZES.width * 0.125,
        backgroundColor: COLORS.white,
        borderColor:
          props.isFocused[0].value && props.isFocused[0].index === props.id
            ? COLORS.black
            : COLORS.lightGray,
        borderWidth: 2,
        color: COLORS.white,
        ...FONTS.BODY2,

        fontSize: SIZES.font * 2,
        textAlign: "center",
      }}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      keyboardType="numeric"
      placeholder="-"
      placeholderTextColor={COLORS.black}
      value={props.value}
      onChangeText={(value) => {
        props.onChangeText(value);
        if (value.length === 1 && props.id <= 4) {
          return props.setWhichInput(props.id + 1);
        } else if (value.length === 0 && props.id > 0) {
          return props.setWhichInput(props.id - 1);
        }
      }}
      returnKeyType="next"
    />
  );
};

export default codeInput;
