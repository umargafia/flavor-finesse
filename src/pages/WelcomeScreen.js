import React from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Divider } from '@rneui/base';
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
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.8)', 'transparent']}
          style={styles.overlay}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Welcome to Flavor Finesse!</Text>
            <Text style={styles.subtitle}>
              Discover, cook, and share your favorite recipes with ease. Let's
              make every meal a masterpiece together. Enjoy the experience!
            </Text>
            <View style={styles.buttonsContainer}>
              <Text
                style={{
                  color: theme.palette.white,
                  textAlign: 'center',
                  fontFamily: theme.font.sansRegular,
                }}
              >
                Step Inside the Kitchen!, create Your account to continue
              </Text>
              <LoginButton
                title="Continue with Your Email and Password"
                image={require('../images/gmail.png')}
                color={theme.palette.primary}
                textStyle={{
                  color: theme.palette.white,
                }}
                onPress={() => navigation.navigate('authPage')}
              />
              <Divider color={theme.palette.white} width={3} />
            </View>
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
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: '10%',
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
    fontFamily: theme.font.DancingScriptMedium,
  },
  buttonsContainer: {
    transform: [{ translateY: theme.window.windowHeight / 4 }],
    alignItems: 'center',
  },
  appLogo: {
    width: 200,
    height: 200,
  },
});
