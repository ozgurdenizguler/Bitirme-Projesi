import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

const mainScreenTopBar = (props) => {
  const { image, title, onPress } = props;
  return (
    <View
      style={{
        height: SIZES.height * 0.085,
        flexDirection: "row",
        width: SIZES.width,
        backgroundColor: COLORS.secondary,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: COLORS.secondary,
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: SIZES.width * 0.115,
            marginHorizontal: SIZES.base * 2,
            borderRadius: SIZES.width * 0.1,
            height: SIZES.width * 0.115,
          }}
          source={{
            uri: image ?? "https://i.pravatar.cc/300",
          }}
        />
        <Text
          style={{
            ...FONTS.H3,
            color: COLORS.white,
          }}
        >
          {title}
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={onPress}>
          <MaterialCommunityIcons
            size={32}
            style={{
              marginRight: SIZES.base * 2,
            }}
            color={"white"}
            name={"exit-to-app"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default mainScreenTopBar;
