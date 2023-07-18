import { StyleSheet, View } from "react-native";
import React from "react";
import { Theme } from "../../constants/Theme";

const theme = Theme();
const MyCard = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default MyCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.white,
    padding: 10,
    borderRadius: 5,
    ...theme.ShadowLight,
  },
});
