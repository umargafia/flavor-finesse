import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import Constants from 'expo-constants'; // Assuming you are using Expo for React Native
import { Theme } from '../../constants/Theme';

const theme = Theme();

const AboutScreen = () => {
  const appVersion = Constants.manifest.version || '1.0.0';

  const teamInfo = 'Umar Faruk Musa - Mobile App Developer';

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/icon.png')}
        style={styles.appLogo}
      />
      <Text style={styles.appName}>Flavor Finesse</Text>
      <Text style={styles.description}>
        Your go-to recipe app for culinary inspiration.
      </Text>
      <Text style={styles.version}>Version: {appVersion}</Text>
      <Text style={styles.teamInfo}>{teamInfo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  appLogo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: -100,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.palette.primary,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  version: {
    fontSize: 14,
    marginBottom: 10,
  },
  teamInfo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AboutScreen;
