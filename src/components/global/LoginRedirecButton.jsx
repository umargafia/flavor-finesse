import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '../../constants/Theme';

const theme = Theme();
export default function LoginRedirectButton({ color, text }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('authPage')}>
      <Text
        style={[
          styles.buttonText,
          color && { color, borderBottomColor: color },
        ]}
      >
        {text ? text : 'Login to see your favorites'}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  buttonText: {
    color: theme.palette.link,
    textTransform: 'capitalize',
    borderBottomWidth: 2,
    borderBottomColor: theme.palette.link,
    fontFamily: theme.font.sansRegular,
    marginTop: 10,
    fontSize: 20,
  },
});
