import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';

import MyGrid from '../global/MyGrid';
import MyIcon from '../global/MyIcon';
import { Theme } from '../../constants/Theme';

const theme = Theme();
const SettingItem = ({ text, icon, color, onPress }) => {
  return (
    <Pressable
      android_ripple={{ color: theme.palette.tertiary }}
      onPress={onPress}
    >
      <MyGrid style={styles.container}>
        <MyGrid>
          <MyIcon color={theme.palette.tertiary} name={icon} />
          <Text style={[styles.text, color && { color }]}>{text}</Text>
        </MyGrid>
        <MyIcon name="chevron-forward" color={theme.palette.tertiary} />
      </MyGrid>
    </Pressable>
  );
};

export default SettingItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    margin: 10,
  },
  text: {
    fontSize: theme.window.windowWidth > 600 ? 18 : 15,
    fontFamily: theme.font.sansRegular,
    marginLeft: 10,
    maxWidth: '80%',
    overflow: 'scroll',
  },
});
