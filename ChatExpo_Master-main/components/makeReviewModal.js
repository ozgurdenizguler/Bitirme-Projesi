import React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import inlineButton from "./buttons/inlineButton";
import textInput from "./textInput";
import setReviewStars from "./setReviewStars";

const makeReviewModal = (props) => {
  return (
    <View>
      <Modal
        backdropOpacity={0.85}
        onBackdropPress={props.toggleModal}
        isVisible={props.isModalVisible}
      >
        <View
          style={{
            flex: 0.45,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              flex: 0.8,
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                flex: 0.4,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={FONTS.H3}>Make a Review to </Text>
              <Text style={{ ...FONTS.H3, color: COLORS.buttonMainColor }}>
                {props.guideName}
              </Text>
            </View>
            <View
              style={{
                flex: 0.25,
              }}
            >
              {setReviewStars({
                reviewPoint: props.reviewPoint,
                size: 26,
                setReviewPoint: props.setReviewPoint,
              })}
            </View>
            <View
              style={{
                flex: 0.25,
                marginBottom: 24,
              }}
            >
              {textInput({
                label: "Your Comment",
                type: "outlined",
                value: props.value,
                defaultValue: props.value,
                onChangeText: props.onChangeText,
              })}
            </View>
            <View style={{ flex: 0.2 }}>
              {inlineButton({
                text: "Submit",
                onPress: props.onPress,
              })}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default makeReviewModal;
