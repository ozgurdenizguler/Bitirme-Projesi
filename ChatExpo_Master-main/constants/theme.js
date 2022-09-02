import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  // base colors
  primary: "#fff",
  secondary: "#32C2E3", // Gray
  secondaryLinear: "#ea8834",
  buttonText: "#F6F1FB",
  textInput: "#2B2F3B",
  buttonMainColor: "#2bad68",
  secondaryBackgroundColoColor: "#20263C",
  twitterColor: "#1DA1F2",
  facebookColor: "#3b5998",
  instagramColor: "#e4405f",
  lightOrange: "#FF6F4A",

  darkOrange: "#FF704A",

  // colors
  black: "#1E1F20",
  white: "#FFFFFF",
  lightGray: "#eff2f5",
  gray: "#BEC1D2",
  green: "#25C685",
  green2: "#40DF9F",
  yellow: "#FFC542",
  red: "#DA1212",
  bordo: "#580B2B",
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 26,
  h3: 22,
  h4: 18,
  body1: 22,
  body2: 18,
  body3: 16,
  body4: 14,

  // app dimensions
  width,
  height,
};
export const SHADOWS = {
  shadow1: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 0.3,

    elevation: 4,
  },
  textShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.3,

    elevation: 4,
  },
  input: {
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 12,
    elevation: 5,
  },
};
export const STYLES = {
  container: {
    flex: 1,
    alignItems: "center",

    backgroundColor: COLORS.primary,
  },
  button: {
    width: width * 0.8,
    height: height * 0.1,
    backgroundColor: "#ffc107",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.1,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  divider: {
    marginVertical: SIZES.height * 0.035,
    width: SIZES.width * 0.9,
    borderBottomColor: "rgba(121,114,114,0.6)",
    borderBottomWidth: 0.75,
  },
};
export const LAYOUT = {
  alignCenter: {
    alignItems: "center",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  setFlex1: {
    flex: 1,
  },
  marginBottomNavigator: {
    marginBottom: Dimensions.get("window").height * 0.09,
  },
};
export const FONTS = {
  H1: {
    fontSize: SIZES.h1,
    fontFamily: "Roboto_700Bold",
    color: COLORS.black,
  },
  H2: {
    fontSize: SIZES.h2,
    fontFamily: "Roboto_700Bold",
    color: COLORS.black,
  },
  H3: {
    fontSize: SIZES.h3,
    fontFamily: "Roboto_700Bold",
    color: COLORS.black,
  },
  H4: {
    fontSize: SIZES.h4,

    fontFamily: "Roboto_700Bold",
    color: COLORS.black,
  },
  NAME: {
    fontSize: SIZES.h2,
    fontFamily: "Roboto_500Medium",
    color: COLORS.black,
  },
  MEDIUM: {
    fontSize: SIZES.body2,
    fontFamily: "Roboto_400Regular",
    color: COLORS.black,
  },

  BODY1: {
    fontSize: SIZES.body1,
    fontFamily: "Roboto_500Medium",
    color: COLORS.black,
  },
  BODY2: {
    fontSize: SIZES.body2,
    fontFamily: "Roboto_500Medium",
    color: COLORS.black,
  },
  BODY3: {
    fontSize: SIZES.body3,
    fontFamily: "Roboto_500Medium",
    color: COLORS.black,
  },
  BODY4: {
    fontSize: SIZES.body4,
    fontFamily: "Roboto_500Medium",
    color: COLORS.black,
  },
  THIN_BODY1: {
    fontSize: SIZES.body1,
    fontFamily: "Roboto_300Light",
    color: COLORS.black,
  },
  THIN_BODY2: {
    fontSize: SIZES.body2,
    fontFamily: "Roboto_300Light",
    color: COLORS.black,
  },
  THIN_BODY3: {
    fontSize: SIZES.body3,
    fontFamily: "Roboto_300Light",
    color: COLORS.black,
  },
  THIN_BODY4: {
    fontSize: SIZES.body4,
    fontFamily: "Roboto_300Light",
    color: COLORS.black,
  },
};
export const FONTS_REGISTER = {
  H1: {
    fontSize: 32,
    fontFamily: "Roboto_700Bold",
    color: COLORS.black,
  },
  H2: {
    fontSize: SIZES.h2,
    fontFamily: "Roboto_700Bold",
    color: COLORS.black,
  },
  H3: {
    fontSize: SIZES.h3,
    fontFamily: "Roboto_700Bold",
    color: COLORS.black,
  },
  H4: {
    fontSize: SIZES.h4,

    fontFamily: "Roboto_700Bold",
    color: COLORS.black,
  },
  NAME: {
    fontSize: SIZES.h2,
    fontFamily: "Roboto_700Bold",
    color: COLORS.black,
  },
  MEDIUM: {
    fontSize: SIZES.body2,
    fontFamily: "Roboto_700Bold",
    color: COLORS.black,
  },

  BODY1: {
    fontSize: SIZES.body1,
    fontFamily: "Roboto_400Regular",
    color: COLORS.black,
  },
  BODY2: {
    fontSize: SIZES.body2,
    fontFamily: "Roboto_400Regular",
    color: COLORS.black,
  },
  BODY3: {
    fontSize: SIZES.body3,
    fontFamily: "Roboto_400Regular",
    color: COLORS.black,
  },
  BODY4: {
    fontSize: SIZES.body4,
    fontFamily: "Roboto_400Regular",
    color: COLORS.black,
  },
  THIN_BODY1: {
    fontSize: SIZES.body1,
    fontFamily: "Roboto_300Light",
    color: COLORS.black,
  },
  THIN_BODY2: {
    fontSize: SIZES.body2,
    fontFamily: "Roboto_300Light",
    color: COLORS.black,
  },
  THIN_BODY3: {
    fontSize: SIZES.body3,
    fontFamily: "Roboto_300Light",
    color: COLORS.black,
  },
  THIN_BODY4: {
    fontSize: SIZES.body4,
    fontFamily: "Roboto_300Light",
    color: COLORS.black,
  },
};
const appTheme = { COLORS, SIZES, SHADOWS, STYLES };

export default appTheme;
