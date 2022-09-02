import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const giftedChat = (props) => {
  const { LocationView, getLocationAsync, location } = props;

  return (
    <GiftedChat
      renderActions={(props) => {
        return (
          <View style={{ flexDirection: "row", paddingBottom: 14 }}>
            <TouchableOpacity
              onPress={async () => {
                await getLocationAsync();
                if (location) {
                  props.onSend({
                    text: "",
                    location: {
                      latitude: location?.latitude,
                      longitude: location?.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    },
                  });
                } else {
                  alert("Konumunuz bulunamadı, lütfen tekrar deneyiniz.");
                }
              }}
            >
              <MaterialCommunityIcons size={24} name={"map-marker"} />
            </TouchableOpacity>
          </View>
        );
      }}
      placeholder={"Mesajınız"}
      renderSend={(props) => (
        <Send {...props}>
          <Text
            style={{
              ...FONTS.BODY2,
              fontSize: 16,

              marginRight: 14,
              paddingBottom: 8,
              color: COLORS.secondary,
            }}
          >
            Gönder
          </Text>
        </Send>
      )}
      renderTime={(props) => {
        return (
          <Text
            style={{
              ...FONTS.BODY2,
              fontSize: 12,
              color: "white",
              paddingLeft: props.position === "left" ? 8 : 0,
              paddingRight: props.position === "right" ? 8 : 0,
              paddingBottom: 2,
            }}
          >
            {props.currentMessage.createdAt.toLocaleString("tr-TR", {
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            })}
          </Text>
        );
      }}
      renderBubble={(props) => {
        const { currentMessage } = props;
        if (
          currentMessage?.location?.latitude &&
          currentMessage?.location?.longitude &&
          currentMessage?.text?.length === 0
        ) {
          return (
            <LocationView {...props} location={currentMessage?.location} />
          );
        } else {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: COLORS.instagramColor,
                  borderBottomLeftRadius: 2,
                  justifyContent: "flex-start",
                  paddingVertical: SIZES.width * 0.01,
                  paddingHorizontal: SIZES.width * 0.01,

                  alignItems: "flex-start",
                },
                right: {
                  backgroundColor: COLORS.secondary,
                  right: 8,
                  borderBottomRightRadius: 2,
                  justifyContent: "center",
                },
              }}
              textStyle={{
                left: {
                  ...FONTS.BODY3,
                  fontSize: SIZES.width * 0.0425,
                  color: COLORS.primary,
                },
                right: {
                  ...FONTS.BODY3,
                  fontSize: SIZES.width * 0.0425,
                  color: COLORS.primary,
                },
              }}
            />
          );
        }
      }}
      timeTextStyle={{
        left: {
          ...FONTS.BODY3,
          fontSize: SIZES.width * 0.025,
          color: COLORS.primary,
        },
        right: {
          ...FONTS.BODY3,
          fontSize: SIZES.width * 0.025,
          color: COLORS.primary,
        },
      }}
      renderAvatarOnTop={true}
      messages={props.messages}
      showUserAvatar={false}
      onSend={(messages) => props.onSend(messages)}
      user={{
        _id: props.auth?.currentUser?.uid,
        avatar: props.auth?.currentUser?.photoURL,
      }}
    />
  );
};

export default giftedChat;
