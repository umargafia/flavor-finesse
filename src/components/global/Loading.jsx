import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Theme } from '../../constants/Theme';

const theme = Theme();
export default function Loading({ style, containerStyle }) {
  return (
    <View
      style={{
        zIndex: 300,
        backgroundColor: theme.palette.white,
        position: 'relative',
        top: 0,
        height: theme.window.windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        ...containerStyle,
      }}
    >
      <Image
        source={require('../../images/spinner.gif')}
        style={[{ width: 50, height: 50 }, style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
