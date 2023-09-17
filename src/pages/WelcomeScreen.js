import React from 'react';
import { ImageBackground, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoginButton from '../components/global/LoginButton';
const image = require('../images/bg3.jpg');
import { Theme } from '../constants/Theme';
import { StatusBar } from 'expo-status-bar';

const theme = Theme();

const WelcomeScreen = ({ navigation }) => {
  function handleGoogleAuth() {
    navigation.replace('buttonTabs', { screen: 'rw/home' });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.container}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'transparent']}
          style={styles.container}
        >
          <View style={styles.topContainer}>
            <Text style={styles.title}>Welcome to Flavor Finesse!</Text>
            <Text style={styles.subtitle}>
              Discover, cook, and share your favorite recipes with ease. Let's
              make every meal a masterpiece together. Enjoy the experience!
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <LinearGradient
              colors={[theme.palette.primary, theme.palette.tertiary]}
              style={[styles.container, styles.bottomLinearGradient]}
            >
              <Text style={styles.innerText}>
                Step Inside the Kitchen!, create Your account to continue
              </Text>
              <LoginButton
                title="Continue with Email and Password"
                color={theme.palette.white}
                textStyle={{
                  color: theme.palette.tertiary,
                }}
                onPress={() => navigation.navigate('authPage')}
              />
              <LoginButton
                title="Continue without Logging"
                color={theme.palette.white}
                textStyle={{
                  color: theme.palette.tertiary,
                }}
                onPress={handleGoogleAuth}
              />
            </LinearGradient>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1.5,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  bottomContainer: {
    flex: 1,
  },
  title: {
    fontSize: 36,
    color: theme.palette.white,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: theme.font.firasansBold,
  },
  subtitle: {
    fontSize: 18,
    color: theme.palette.white,
    textAlign: 'center',
    fontFamily: theme.font.firasansBold,
  },
  bottomLinearGradient: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    justifyContent: 'center',
  },
  innerText: {
    color: theme.palette.white,
    textAlign: 'center',
    fontFamily: theme.font.DancingScriptMedium,
    fontSize: 20,
  },
});
