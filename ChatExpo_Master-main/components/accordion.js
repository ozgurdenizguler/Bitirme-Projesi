import { StyleSheet, Text, View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import React from "react";

const accordion = (props) => {
  const { setActiveSections, activeSections, SECTIONS } = props;
  const renderHeader = (section) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  const renderContent = (section) => {
    return (
      <View style={styles.content}>
        <Text style={styles.contentText}>{section.content}</Text>
      </View>
    );
  };

  const updateSection = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <Accordion
      underlayColor={COLORS.white}
      sections={SECTIONS}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={updateSection}
    />
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SIZES.base,

    borderWidth: 2,
    borderColor: COLORS.secondary,
    marginBottom: SIZES.base * 1.5,
    zIndex: 999,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.base,
  },
  resultTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: SIZES.base,
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    padding: SIZES.base,
    borderRadius: SIZES.radius,
    marginVertical: SIZES.base,
    width: SIZES.width * 0.9,
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
  },
  headerText: {
    ...FONTS.H3,
    fontSize: 18,
    color: COLORS.white,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.base,
    marginVertical: SIZES.base / 2,
  },
  header: {
    backgroundColor: COLORS.secondary,
    marginBottom: 12,
    backfaceVisibility: "hidden",
    borderRadius: SIZES.radius,
    width: SIZES.width * 0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  contentText: {
    ...FONTS.BODY3,
    width: SIZES.width * 0.9,
    textAlign: "left",
  },
});
export default accordion;
