import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Theme } from '../../constants/Theme';
import MyIcon from './MyIcon';

const theme = Theme();
export default function MyInput({
  name,
  text,
  password,
  type,
  value,
  onChangeText,
  inputStyle,
  style,
  error,
}) {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <View style={[styles.container, style]}>
      <MyIcon name={name} style={styles.iconLeft} size={25} />
      <TextInput
        placeholder={text}
        style={[styles.input, inputStyle, error && styles.inputError]}
        secureTextEntry={password && showPassword ? true : false}
        keyboardType={type}
        value={value}
        onChangeText={onChangeText}
      />
      {password && (
        <TouchableOpacity
          style={styles.iconRight}
          onPress={() => setShowPassword((prev) => !prev)}
        >
          <MyIcon name={showPassword ? 'eye' : 'eye-off'} size={30} />
        </TouchableOpacity>
      )}
      {error !== '' && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5,
  },
  iconLeft: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
  },
  iconRight: {
    position: 'absolute',
    right: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    paddingLeft: 40,
    backgroundColor: theme.palette.primary,
    margin: 10,
    fontSize: 20,
    borderRadius: 10,
    ...theme.shadow,
    fontWeight: 'bold',
  },
  inputError: {
    borderColor: theme.palette.tertiary,
    borderWidth: 2,
  },
  errorText: {
    position: 'absolute',
    left: 20,
    fontWeight: 'bold',
    color: 'red',
    bottom: -11,
    letterSpacing: 2,
    textTransform: 'capitalize',
  },
});
