import { Text, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

const editTopBar = (props) => {
  return (
    <View
      style={{
        alignItems: "center",
        borderColor: COLORS.white,
        justifyContent: "center",
        height: SIZES.height * 0.1,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={props.onPress}>
          <View
            style={{
              width: SIZES.width * 0.25,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <MaterialCommunityIcons
              color={"black"}
              name={"chevron-left"}
              size={SIZES.width * 0.09}
            />
            <Text style={{ color: COLORS.white }}>Back</Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            width: SIZES.width * 0.5,
            height: SIZES.height * 0.09,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.H3,
              fontSize: SIZES.width * 0.05,
            }}
          >
            {props.title}
          </Text>
        </View>
        <TouchableOpacity onPress={props.onPressSave}>
          <View
            style={{
              width: SIZES.width * 0.25,
              height: SIZES.height * 0.1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ ...FONTS.BODY2 }}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default editTopBar;
