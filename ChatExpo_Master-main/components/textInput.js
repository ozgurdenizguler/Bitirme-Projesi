import React from "react";
import { COLORS, SHADOWS, SIZES } from "../constants/theme";
import { Input } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const textInput = (props) => {
  return (
    <Input
      key={props.key || props.name}
      onFocus={props.onFocus}
      secureTextEntry={props.secureTextEntry}
      style={{
        width: SIZES.width * 0.9,
        height: props.height ? props.height : SIZES.height * 0.07,
        borderBottomWidth: 0,
      }}
      rightIcon={
        props.rightIcon ? (
          <MaterialCommunityIcons
            onPress={props.onPress}
            color={COLORS.black}
            name={"eye"}
            size={22}
          />
        ) : null
      }
      containerStyle={{
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 0,
        width: SIZES.width * 0.9,
        backgroundColor: "#ECECEC",

        height: props.height ? props.height : SIZES.height * 0.07,
      }}
      labelStyle={{
        marginLeft: 2,
        position: "absolute",
        width: SIZES.width * 0.9,
        bottom: SIZES.height * 0.0775,
        fontSize: 18,
        color: COLORS.secondary,
        marginTop: props.label ? SIZES.height * 0.0075 : 0,
      }}
      inputContainerStyle={{
        borderBottomWidth: 0,
        borderTopWidth: 0,

        borderRightWidth: 0,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: props.label ? SIZES.width * 0.005 : 0,
        borderLeftWidth: 0,
        height: props.height ? props.height : SIZES.height * 0.07,
        width: SIZES.width * 0.85,

        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
      multiline={props.multiline}
      label={props.label}
      type={"outlined"}
      keyboardType={props.keyboardType}
      value={props.value}
      placeholder={props.placeholder}
      defaultValue={props.value}
      placeholderTextColor={"rgba(0,0,0,0.9)"}
      onChange={props.onChangeText}
      onChangeText={props.onChangeText}
    />
  );
};

export default textInput;
