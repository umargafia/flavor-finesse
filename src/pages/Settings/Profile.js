import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '../../constants/Theme';
import MyCard from '../../components/global/MyCard';
import MyGrid from '../../components/global/MyGrid';
import MyInput from '../../components/global/MyInput';
import MyButton from '../../components/global/MyButton';
import { ChangePassword } from '../../store/api';
import { storeData } from '../../constants/storage';
import { loginUser } from '../../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const theme = Theme();
export default function ProfilePage() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [passwordData, setPasswordData] = useState({
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChangePassword = async () => {
    if (
      passwordData.password.trim().length === 0 ||
      passwordData.passwordConfirm.trim().length === 0 ||
      passwordData.passwordCurrent.trim().length === 0
    ) {
      setError('All fields are required');
      return;
    }

    if (passwordData.password !== passwordData.passwordConfirm) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await ChangePassword({ data: passwordData, token });

      if (response?.status !== 'success') {
        setError(response?.message);
        setLoading(false);
        return;
      }

      AsyncStorage.removeItem('user');
      await AsyncStorage.setItem('user', JSON.stringify(response)); // Assuming response is an object
      dispatch(loginUser(response));
      setSuccess('Password changed successfully');
      setPasswordData({
        passwordCurrent: '',
        password: '',
        passwordConfirm: '',
      });
    } catch (error) {
      setError('An error occurred while changing the password');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value, field) => {
    setError('');
    setSuccess('');
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const currentUser = user.data;

  return (
    <View container={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Hi {currentUser.name}</Text>
        <Text style={styles.subtitle}>Personal Information</Text>
        <RowItem header="Name:" title={currentUser.name} />
        <RowItem header="Email:" title={currentUser.email} />
        <RowItem header="Username:" title={currentUser.username} />
        <Text style={styles.subtitle}>Change Password</Text>
        <MyInput
          style={styles.input}
          text="Current Password"
          password
          name="lock-closed"
          value={passwordData.passwordCurrent}
          onChangeText={(e) => handleChange(e, 'passwordCurrent')}
        />
        <MyInput
          style={styles.input}
          text="New Password"
          password
          name="lock-closed"
          value={passwordData.password}
          onChangeText={(e) => handleChange(e, 'password')}
        />
        <MyInput
          style={styles.input}
          text="Confirm Password"
          password
          name="lock-closed"
          value={passwordData.passwordConfirm}
          onChangeText={(e) => handleChange(e, 'passwordConfirm')}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        {success && <Text style={styles.success}>{success}</Text>}
        <MyButton
          title={loading ? 'Loading...' : 'Submit'}
          style={[styles.input, styles.button]}
          onPress={handleChangePassword}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 20,
    fontSize: 25,
    color: theme.palette.primary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 20,
    fontSize: 25,
    color: theme.palette.black,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  card: {
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: theme.palette.primary,
  },
  input: {
    width: '90%',
  },
  button: {
    transform: [
      {
        translateX: 3,
      },
    ],
  },
  error: {
    color: theme.palette.error,
    textAlign: 'center',
  },
  success: {
    color: 'green',
    textAlign: 'center',
  },
});

const RowItem = ({ header, title }) => {
  return (
    <MyCard style={styles.card}>
      <MyGrid style={{ justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: 'bold' }}>{header}</Text>
        <Text style={{ color: theme.palette.white, fontWeight: 'bold' }}>
          {title}
        </Text>
      </MyGrid>
    </MyCard>
  );
};
