import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
      {icon && <Ionicons name="icon" size={50} />}
      {image && <Image source={image} style={styles.image} />}
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.window.windowWidth < 800 ? 10 : 20,
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    opacity: 0.99,
    ...theme.shadow,
  },

  text: {
    textAlign: 'center',
    textTransform: 'uppercase',
    marginLeft: 20,
    fontSize: 16,
    color: theme.palette.black,
    fontWeight: 'bold',
    fontFamily: theme.font.sansRegular,
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
