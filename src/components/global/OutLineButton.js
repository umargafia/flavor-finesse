import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Theme } from "../../constants/Theme";

const theme = Theme();

export default function OutlineButton({
  title,
  style,
  onPress,
  icon,
  textStyle,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        style,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      {icon && <Ionicons name="icon" size={50} />}
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    opacity: 0.99,
    borderWidth: 1,
    borderColor: theme.palette.tertiary,
  },

  text: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 16,
    color: theme.palette.tertiary,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
});
