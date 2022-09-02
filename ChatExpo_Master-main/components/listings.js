import React from "react";
import { View, Text } from "react-native";
import { FONTS, SIZES } from "../constants/theme";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
const listings = (props) => {
  return (
    <View
      style={{
        width: SIZES.width * 0.9,
      }}
    >
      <View
        style={{
          justifyContent: "center",
        }}
      >
        {props.alcohol ? (
          <View
            style={{
              height: SIZES.height * 0.055,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              style={{
                marginRight: SIZES.width * 0.05,
              }}
              size={28}
              name={"beer"}
            />

            <Text
              style={{
                ...FONTS.BODY2,
              }}
            >
              Alcohol
            </Text>
          </View>
        ) : null}

        {props.outdoor ? (
          <View
            style={{
              height: SIZES.height * 0.055,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              style={{
                marginRight: SIZES.width * 0.05,
              }}
              size={28}
              name={"local-activity"}
            />

            <Text
              style={{
                ...FONTS.BODY2,
              }}
            >
              Outdoor Activities
            </Text>
          </View>
        ) : null}
      </View>
      <View
        style={{
          alignItems: "flex-start",
        }}
      >
        {props.food ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              style={{
                marginRight: SIZES.width * 0.05,
              }}
              size={28}
              name={"food-variant"}
            />

            <Text
              style={{
                ...FONTS.BODY2,
              }}
            >
              Food & Drink places
            </Text>
          </View>
        ) : null}

        {props.smoking ? (
          <View
            style={{
              height: SIZES.height * 0.055,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              style={{
                marginRight: SIZES.width * 0.05,
              }}
              size={28}
              name={props.smoking ? "smoking" : "smoking-off"}
            />

            <Text
              style={{
                ...FONTS.BODY2,
              }}
            >
              Smoking
            </Text>
          </View>
        ) : null}
      </View>
      <View
        style={{
          alignItems: "flex-start",
        }}
      >
        {props.vegan ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              style={{
                marginRight: SIZES.width * 0.05,
              }}
              size={28}
              name={"food-apple"}
            />

            <Text
              style={{
                ...FONTS.BODY2,
              }}
            >
              Vegan
            </Text>
          </View>
        ) : null}

        {props.vehicle ? (
          <View
            style={{
              height: SIZES.height * 0.055,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome
              style={{
                marginRight: SIZES.width * 0.05,
              }}
              size={24}
              name={"drivers-license"}
            />

            <Text
              style={{
                ...FONTS.BODY2,
              }}
            >
              Driver License
            </Text>
          </View>
        ) : null}
        {props.onlyMen ? (
          <View
            style={{
              height: SIZES.height * 0.055,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              style={{
                marginRight: SIZES.width * 0.05,
              }}
              size={28}
              name={"ios-man"}
            />

            <Text
              style={{
                ...FONTS.BODY2,
              }}
            >
              Only Mens
            </Text>
          </View>
        ) : null}
        {props.onlyWomen ? (
          <View
            style={{
              height: SIZES.height * 0.055,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              style={{
                marginRight: SIZES.width * 0.05,
              }}
              size={28}
              name={"ios-woman"}
            />
            <Text
              style={{
                ...FONTS.BODY2,
              }}
            >
              Only Women
            </Text>
          </View>
        ) : null}
        {props.familyFriendly ? (
          <View
            style={{
              height: SIZES.height * 0.055,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              style={{
                marginRight: SIZES.width * 0.05,
              }}
              size={28}
              name={"family-restroom"}
            />

            <Text
              style={{
                ...FONTS.BODY2,
              }}
            >
              Family Friendly
            </Text>
          </View>
        ) : null}
        {props.longTerm ? (
          <View
            style={{
              height: SIZES.height * 0.055,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              style={{
                marginRight: SIZES.width * 0.05,
              }}
              size={28}
              name={"clock-outline"}
            />

            <Text
              style={{
                ...FONTS.BODY2,
              }}
            >
              Long Term
            </Text>
          </View>
        ) : null}
        {props.shortTerm ? (
          <View
            style={{
              height: SIZES.height * 0.055,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              style={{
                marginRight: SIZES.width * 0.05,
              }}
              size={28}
              name={"clock"}
            />

            <Text
              style={{
                ...FONTS.BODY2,
              }}
            >
              Short Term
            </Text>
          </View>
        ) : null}
        {props.vehicle ? (
          <View
            style={{
              height: SIZES.height * 0.055,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              style={{
                marginRight: SIZES.width * 0.05,
              }}
              size={28}
              name={"paw"}
            />

            <Text
              style={{
                ...FONTS.BODY2,
              }}
            >
              Pets
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default listings;
