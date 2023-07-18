import { StyleSheet, Text } from 'react-native';
import React from 'react';

import { Theme } from '../../constants/Theme';

const theme = Theme();

const Title = ({ text }) => {
  return <Text style={styles.title}>{text}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: theme.window.windowWidth <= 360 ? 30 : 40,
    color: 'black',
    fontFamily: theme.font.DancingScriptMedium,
    marginBottom: 20,
  },
});
