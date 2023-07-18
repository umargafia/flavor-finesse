import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CreateUser, LoginUser } from '../../store/api';
import { loginUser, setError } from '../../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isLogin, setlogin] = useState(false);
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {}, []);

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginChange = (fieldName) => (text) => {
    setError('');
    setLoginData((prev) => {
      return {
        ...prev,
        [fieldName]: text,
      };
    });
  };

  const handleSignUpChange = (fieldName) => (text) => {
    setError('');
    setSignupData((prev) => {
      return {
        ...prev,
        [fieldName]: text,
      };
    });
  };

  const handleSubmit = () => {
    if (isLogin) {
      if (
        loginData.email.trim().length === 0 ||
        loginData.password.trim().length === 0
      ) {
        Alert.alert('Input Error', 'Make sure all inputs are filled');
        return;
      }
      handleLogin();
    } else {
      if (
        signupData.email.trim().length === 0 ||
        signupData.name.trim().length === 0 ||
        signupData.password.trim().length === 0 ||
        signupData.username.trim().length === 0
      ) {
        Alert.alert('Input Error', 'Make sure all inputs are filled');
        return;
      }
      handleSingUp();
    }
  };

  function setAuthError(response) {
    if (response?.status !== 'success') {
      response.message
        ? setError(response.message)
        : setError('something went wrong try again');
      setLoading(false);
      return true;
    }
    return false;
  }

  const handleLogin = async () => {
    setLoading(true);
    const userData = {
      identifier: loginData.email,
      password: loginData.password,
    };

    const response = await LoginUser(userData);
    if (setAuthError(response)) {
      return;
    }
    setLoading(false);

    navigation.replace('buttonTabs', { screen: 'rw/home' });
  };
  const handleSingUp = async () => {
    setLoading(true);
    const userData = {
      name: signupData.name,
      email: signupData.email,
      username: signupData.username,
      password: signupData.password,
      passwordConfirm: signupData.confirmPassword,
    };

    const response = await CreateUser(userData);
    if (setAuthError(response)) {
      return;
    }
    dispatch(loginUser(response));
    navigation.replace('buttonTabs', { screen: 'rw/home' });
  };

  return {
    isLogin,
    loginData,
    signupData,
    loading,
    error,
    setlogin,
    handleSubmit,
    handleLoginChange,
    handleSignUpChange,
  };
};
