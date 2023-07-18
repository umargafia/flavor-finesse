import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Theme } from "../../constants/Theme";

const theme = Theme();

export default function MyButton({ title, style, onPress, icon, textStyle }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        style,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
      {icon && <Ionicons name={icon} size={30} />}
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
    backgroundColor: theme.palette.tertiary,
    ...theme.shadow,
  },

  text: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 16,
    color: theme.palette.white,
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
