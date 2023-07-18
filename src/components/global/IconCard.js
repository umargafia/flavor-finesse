import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import React from "react";
import MyIcon from "./MyIcon";

import { Theme } from "../../constants/Theme";

const theme = Theme();

const IconCard = ({ name, onPress, component, style, color, title }) => {
  return (
    <TouchableOpacity
      style={[component ? { ...styles.component, ...style } : styles.container]}
      onPress={onPress}
    >
      <View>
        <MyIcon name={name} color={color} style={{ textAlign: "center" }} />
        {title && <Text style={{ textAlign: "center" }}>{title}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default IconCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.palette.white,
    borderRadius: 10,
    elevation: 2,
    ...theme.shadow,
    position: "absolute",
    top: theme.window.windowWidth > 800 ? 60 : 30,
    left: 30,
  },
  component: {
    padding: 10,
    backgroundColor: theme.palette.white,
    borderRadius: 10,
    elevation: 2,
    ...theme.shadow,
  },
});
