import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Divider } from '@rneui/base';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '../../constants/Theme';
import MyCard from '../../components/global/MyCard';
import SettingItem from '../../components/Settings/SettingItem';
import { logout } from '../../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import openEmailWithFeedback from '../../constants/openEmailWithFeedback';
import LoginRedirectButton from '../../components/global/LoginRedirecButton';

const theme = Theme();
const Settings = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  function handleSignOut() {
    AsyncStorage.clear();
    dispatch(logout());
    navigation.navigate('welcomeScreen');
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <LinearGradient
          style={styles.profileContainer}
          colors={[theme.palette.primary, theme.palette.tertiary]}
        >
          <View style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={require('../../../assets/icon.png')}
            />
          </View>
          {!isAuthenticated ? (
            <LoginRedirectButton color={theme.palette.white} text="Sign In" />
          ) : (
            <>
              <Text style={styles.name}>{user?.data.name}</Text>
              <Text style={styles.email}>{user?.data.email}</Text>
            </>
          )}

          {/* top card */}
          <MyCard style={styles.topCard}>
            {isAuthenticated && (
              <SettingItem
                text="Edit Profile"
                icon="person-outline"
                onPress={() => navigation.navigate('profilePage')}
              />
            )}
            <Divider />
            <SettingItem
              text="About Flavor finesse"
              icon="information-circle-outline"
              onPress={() => navigation.navigate('aboutPage')}
            />
          </MyCard>
          {/* feedback card */}
          <MyCard style={styles.topCard}>
            <SettingItem
              text="Have a minute? Help us improve by rating our app!"
              icon="star-half-outline"
            />
            <Divider />
            <SettingItem
              text="Got questions or feedback? Contact us!"
              icon="mail-open-outline"
              onPress={openEmailWithFeedback}
            />
          </MyCard>
          {/* legal */}
          <MyCard style={styles.topCard}>
            <SettingItem
              text="Terms and Conditions"
              icon="receipt-outline"
              onPress={() => navigation.navigate('termsAndCondition')}
            />
            <Divider />
            <SettingItem
              text="privacy policy"
              icon="document-outline"
              onPress={() => navigation.navigate('privacyPolicy')}
            />
          </MyCard>
          {/* account */}
          {isAuthenticated && (
            <MyCard style={styles.topCard}>
              <SettingItem
                text="Sign Out"
                icon="log-out-outline"
                onPress={handleSignOut}
              />

              <Divider />
              <SettingItem
                text="Delete Account"
                color={theme.palette.tertiary}
                icon="trash-outline"
                onPress={() => navigation.navigate('deleteAccountPage')}
              />
            </MyCard>
          )}
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    minWidth: '100%',
    minHeight: '100%',
  },
  profileImageContainer: {
    ...theme.shadow,
    backgroundColor: theme.palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: theme.palette.tertiary,
    borderWidth: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'center',
  },
  name: {
    fontSize: 30,
    fontFamily: theme.font.sansRegular,
    color: theme.palette.white,
    letterSpacing: 3,
    marginTop: 2,
    textAlign: 'center',
  },
  email: {
    color: theme.palette.white,
    fontFamily: theme.font.firasansBold,
    letterSpacing: 2,
    fontSize: 16,
    transform: [{ translateY: -10 }],
    marginTop: 2,
  },
  topCard: {
    marginTop: 20,
    width: '90%',
  },
});
