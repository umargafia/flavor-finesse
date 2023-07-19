import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { sendRequest } from '../../store/api';
import { loginUser } from '../../store/authSlice';
import { storeData } from '../../constants/storage';

export const useAuth = () => {
  const dispatch = useDispatch();
  const [isLogin, setlogin] = useState(true);
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginError, setLoginError] = useState({
    email: '',
    password: '',
  });

  const [signupError, setSignupError] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

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
    setLoginError((prev) => {
      return {
        ...prev,
        [fieldName]: '',
      };
    });
    setLoginData((prev) => {
      return {
        ...prev,
        [fieldName]: text,
      };
    });
  };

  const handleSignUpChange = (fieldName) => (text) => {
    setError('');
    setSignupError((prev) => {
      return {
        ...prev,
        [fieldName]: '',
      };
    });
    setSignupData((prev) => {
      return {
        ...prev,
        [fieldName]: text,
      };
    });
  };

  const loginValidation = () => {
    if (loginData.email.trim().length === 0) {
      setLoginError((prev) => {
        return {
          ...prev,
          email: 'Email is required',
        };
      });
    }

    if (loginData.password.trim().length === 0) {
      setLoginError((prev) => {
        return {
          ...prev,
          password: 'Password is required',
        };
      });
    }
  };

  const signupValidation = () => {
    if (signupData.email.trim().length === 0) {
      setSignupError((prev) => {
        return {
          ...prev,
          email: 'Email is required',
        };
      });
    }

    if (signupData.name.trim().length === 0) {
      setSignupError((prev) => {
        return {
          ...prev,
          name: 'Name is required',
        };
      });
    }

    if (signupData.password.trim().length === 0) {
      setSignupError((prev) => {
        return {
          ...prev,
          password: 'Password is required',
        };
      });
    }

    if (signupData.username.trim().length === 0) {
      setSignupError((prev) => {
        return {
          ...prev,
          username: 'Username is required',
        };
      });
    }

    if (signupData.confirmPassword.trim().length === 0) {
      setSignupError((prev) => {
        return {
          ...prev,
          confirmPassword: 'Confirm Password is required',
        };
      });
    }
  };
  const handleSubmit = () => {
    if (isLogin) {
      loginValidation();
      if (
        loginData.email.trim().length === 0 ||
        loginData.password.trim().length === 0
      ) {
        return;
      }
      handleLogin();
    } else {
      signupValidation();
      if (
        signupData.email.trim().length === 0 ||
        signupData.name.trim().length === 0 ||
        signupData.password.trim().length === 0 ||
        signupData.username.trim().length === 0 ||
        signupData.confirmPassword.trim().length === 0
      ) {
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

    const response = await sendRequest({
      url: 'users/login',
      data: userData,
      method: 'POST',
    });

    if (setAuthError(response)) {
      return;
    }
    storeData('user', response);
    dispatch(loginUser(response));
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

    const response = await sendRequest({
      url: 'users/signup',
      data: userData,
      method: 'POST',
    });

    if (setAuthError(response)) {
      return;
    }

    storeData('user', response);
    dispatch(loginUser(response));
    navigation.replace('buttonTabs', { screen: 'rw/home' });
  };

  return {
    isLogin,
    loginData,
    signupData,
    loading,
    error,
    signupError,
    loginError,
    setlogin,
    handleSubmit,
    handleLoginChange,
    handleSignUpChange,
  };
};
