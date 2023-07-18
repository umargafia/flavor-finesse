import { ImageBackground, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Divider } from '@rneui/base';

import LoginButton from '../components/global/LoginButton';
const image = require('../images/bg3.jpg');
import { Theme } from '../constants/Theme';

const theme = Theme();

const WelcomeScreen = ({ navigation }) => {
  function handleGoogleAuth() {
    navigation.replace('buttonTabs', { screen: 'rw/home' });
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.container}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.image}
        >
          <LinearGradient
            colors={[theme.palette.primary, theme.palette.tertiary]}
            style={styles.buttonSection}
          >
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.title}>
                Find the perfect recipes everyday
              </Text>
              <Text style={styles.subtitle}>
                Over 10 thousand recipes of healthy food😋
              </Text>
            </View>
            <Divider color={theme.palette.white} width={3} />
            <View>
              <LoginButton
                title={'continue with Email and Password'}
                image={require('../images/gmail.png')}
                color={theme.palette.red}
                textStyle={{
                  color: theme.palette.white,
                }}
                onPress={() => navigation.navigate('authPage')}
              />
              {/* <LoginButton
                title={'Sign in with Google'}
                image={require('../images/google-icon.png')}
                color={theme.palette.white}
                onPress={handleGoogleAuth}
              /> */}
            </View>
            <Divider color={theme.palette.white} width={3} />
          </LinearGradient>
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
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonSection: {
    height: theme.window.windowWidth < 800 ? '60%' : '40%',
    backgroundColor: theme.palette.primary,
    opacity: 0.65,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,

    justifyContent: 'space-around',
    alignItems: 'stretch',
    paddingHorizontal: '10%',
  },
  title: {
    fontSize: theme.window.windowWidth <= 360 ? 30 : 40,
    color: theme.palette.black,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  subtitle: {
    fontSize: theme.window.windowWidth <= 360 ? 14 : 20,
    marginTop: 10,
    color: theme.palette.black,
    alignSelf: 'center',
  },
});
