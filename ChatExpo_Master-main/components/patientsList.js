import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import moment from "moment";

const patientsList = (props) => {
  const { data, team, navigation } = props;
  const styles = StyleSheet.create({
    text: { ...FONTS.BODY2, color: COLORS.white, marginBottom: 4 },
  });
  const { text } = styles;
  if (data.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.white,
        }}
      >
        <Text
          style={{
            ...FONTS.BODY2,
            color: COLORS.secondary,
          }}
        >
          Henüz bir kişi eklenmemiş.
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      ListHeaderComponent={() => {
        return (
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              width: SIZES.width * 0.7,
              height: SIZES.height * 0.065,
              backgroundColor: "#D9D9D9",
              borderRadius: SIZES.base,
              marginBottom: SIZES.base * 2,
            }}
          >
            <Text
              style={{
                ...FONTS.H2,
                color: COLORS.secondary,
              }}
            >
              Hastalar
            </Text>
          </View>
        );
      }}
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        backgroundColor: COLORS.white,
      }}
      keyExtractor={(item) => item?.id}
      data={data}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={
              team
                ? () =>
                    navigation.navigate("PatientDetailsScreen", {
                      id: item?.id,
                    })
                : null
            }
          >
            <View
              style={{
                marginBottom: SIZES.base * 2,

                paddingVertical: SIZES.base * 2,
                width: SIZES.width * 0.9,
                backgroundColor: COLORS.secondary,
                paddingHorizontal: SIZES.base * 2,
                borderRadius: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: SIZES.base,
                }}
              >
                <Text
                  style={{
                    ...FONTS.H3,
                    color: COLORS.white,
                  }}
                >
                  {item?.name} {item?.surname}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ChatScreen", {
                      userID: item?.id,
                      name: item?.name,
                      photoURL: item?.photoURL,
                    })
                  }
                >
                  <MaterialCommunityIcons
                    size={30}
                    color={COLORS.white}
                    name={"message-arrow-right-outline"}
                  />
                </TouchableOpacity>
              </View>
              <Text style={text}>
                Test Tarihi:{" "}
                {moment(item?.testDate?.toDate()).format("DD/MM/YY")}{" "}
                {item?.testResult === 1
                  ? "Pozitif"
                  : item?.testResult === 0
                  ? "Negatif"
                  : "Test Yapılmadı"}
              </Text>
              <Text style={text}>
                Doğum Tarihi:{" "}
                {moment(item?.birthday?.toDate()).format("DD/MM/YY")}
              </Text>
              <Text style={text}>Aşı Durumu: {item?.vaccination}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default patientsList;
