import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import MyCard from '../global/MyCard';
import { Theme } from '../../constants/Theme';
import MyInput from '../global/MyInput';
import MyButton from '../global/MyButton';
import { useAuth } from './useAuth';
import IconCard from '../global/IconCard';

const theme = Theme();

export default function Form() {
  const navigation = useNavigation();
  const {
    isLogin,
    loginData,
    signupData,
    loading,
    error,
    signupError,
    loginError,
    setlogin,
    handleLoginChange,
    handleSignUpChange,
    handleSubmit,
  } = useAuth();
  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.container}
        // keyboardShouldPersistTaps="handled"
      >
        <MyCard style={styles.card}>
          <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
          {isLogin ? (
            <>
              <MyInput
                value={loginData.email}
                text="Username or Email"
                type="email-address"
                name="mail"
                error={loginError.email}
                onChangeText={handleLoginChange('email')}
              />
              <MyInput
                value={loginData.password}
                text="Password"
                password
                name="lock-closed"
                error={loginError.password}
                onChangeText={handleLoginChange('password')}
              />
            </>
          ) : (
            <>
              <MyInput
                value={signupData.name}
                text="Full Name"
                error={signupError.name}
                name="person-circle-outline"
                onChangeText={handleSignUpChange('name')}
              />
              <MyInput
                value={signupData.email}
                text="Email"
                error={signupError.email}
                type="email-address"
                name="mail"
                onChangeText={handleSignUpChange('email')}
              />
              <MyInput
                value={signupData.username}
                text="User Name"
                name="person-add"
                onChangeText={handleSignUpChange('username')}
                error={signupError.username}
              />
              <MyInput
                value={signupData.password}
                text="Password"
                password
                error={signupError.password}
                name="lock-closed"
                onChangeText={handleSignUpChange('password')}
              />
              <MyInput
                value={signupData.confirmPassword}
                text="Confirm Password"
                error={signupError.confirmPassword}
                password
                name="lock-closed"
                onChangeText={handleSignUpChange('confirmPassword')}
              />
            </>
          )}
          <Text style={styles.errorText}>{error}</Text>
          {loading ? (
            <MyButton
              title={'loading...'}
              textStyle={{ color: theme.palette.tertiary }}
              style={{ backgroundColor: 'lightgray' }}
            />
          ) : (
            <MyButton
              title={isLogin ? 'Sign In' : 'Sign Up'}
              icon="log-in-outline"
              onPress={handleSubmit}
            />
          )}

          {isLogin && (
            <TouchableOpacity style={styles.linkBtn}>
              <Text style={styles.link}>Forgot password?</Text>
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => setlogin((prev) => !prev)}
          >
            <Text style={styles.link}>
              {isLogin
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Sign In'}
            </Text>
          </TouchableOpacity> */}
        </MyCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  card: {
    width: '95%',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.palette.tertiary,
  },
  link: {
    color: theme.palette.tertiary,
    borderBottomWidth: 1,
    borderColor: theme.palette.tertiary,
    margin: 8,
  },
  errorText: {
    color: theme.palette.red,
    textAlign: 'center',
  },
});
