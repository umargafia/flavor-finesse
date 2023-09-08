import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import CustomAlert from './CustomAlert';
import { useNavigation } from '@react-navigation/native';

const LoginPrompt = ({ showAlert, setShowAlert }) => {
  const navigation = useNavigation();
  return (
    <CustomAlert
      isVisible={showAlert}
      message="You need to log in to add this item to your favorite."
      onLogIn={() => {
        setShowAlert(false);
        navigation.navigate('authPage');
      }}
      onCancel={() => setShowAlert(false)} // Close the alert modal when canceled
    />
  );
};

export default LoginPrompt;

const styles = StyleSheet.create({});
