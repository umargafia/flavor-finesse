import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Theme } from '../../constants/Theme';

const theme = Theme();
export default function Loading() {
  return (
    <View
      style={{
        zIndex: 300,
        backgroundColor: theme.palette.white,
        position: 'relative',
        top: 0,
        height: theme.window.windowHeight,
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size="large" color={theme.palette.tertiary} />
    </View>
  );
}

const styles = StyleSheet.create({});
