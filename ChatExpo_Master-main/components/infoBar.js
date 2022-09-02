import { Text, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";

const infoBar = (props) => {
  const { title, text } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        height: SIZES.height * 0.07,
        borderBottomWidth: 1,
        width: SIZES.width * 0.8,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          ...FONTS.BODY2,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          ...FONTS.BODY2,
          color: COLORS.secondary,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default infoBar;
