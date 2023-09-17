import { Pressable, StyleSheet, Text } from 'react-native';

import { Theme } from '../../constants/Theme';

const theme = Theme();

export default function LoginButton({
  title,
  style,
  onPress,
  image,
  icon,
  color,
  textStyle,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        style,
        pressed && styles.pressed,
        { backgroundColor: color ? color : theme.palette.tertiary },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.window.windowWidth < 800 ? 10 : 20,
    width: '95%',
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
    ...theme.shadow,
  },

  text: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 16,
    color: theme.palette.black,
    fontWeight: 'bold',
    fontFamily: theme.font.firasansBold,
  },
  pressed: {
    opacity: 0.7,
  },
});
