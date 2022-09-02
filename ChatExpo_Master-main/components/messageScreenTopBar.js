import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const messageScreenTopBar = (props) => {
  return (
    <View
      style={{
        alignItems: "center",
        borderColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        borderBottomWidth: 1,
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
        <View
          style={{
            width: SIZES.width * 0.25,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              zIndex: 12312312,
            }}
            onPress={props.onPress}
          >
            <View
              style={{
                borderRadius: SIZES.width * 0.1,
                zIndex: 1123412,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <MaterialCommunityIcons
                color={"black"}
                name={"chevron-left"}
                size={SIZES.width * 0.0675}
              />
              <Text style={{ color: COLORS.black }}>Geri</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: SIZES.width * 0.5,
            height: SIZES.height * 0.09,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ ...FONTS.H2, color: "black" }}>{props.name}</Text>
        </View>
        <View
          style={{
            width: SIZES.width * 0.25,
            height: SIZES.height * 0.1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: SIZES.width * 0.115,
              height: SIZES.width * 0.115,
              borderRadius: SIZES.width * 0.135,
            }}
            resizeMode="cover"
            source={{
              uri:
                props.photoURL !== ""
                  ? props.photoURL
                  : "https://firebasestorage.googleapis.com/v0/b/voyself-34d78.appspot.com/o/userImage.png?alt=media&token=00a5c2d6-95c0-4491-8b5d-47f5b6d2d5b9",
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default messageScreenTopBar;
