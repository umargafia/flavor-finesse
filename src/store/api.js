import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const BaseUrl = 'http://localhost:4000/api/v1/';

export const sendRequest = async ({ url, data, method }) => {
  try {
    const response = await fetch(`${BaseUrl}${url}`, {
      method: method ? method : 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const newData = await response.json();
    if (useCheckUser(newData, useLogoutUser)) {
      return;
    }
    return newData;
  } catch (error) {
    return error;
  }
};

const useLogoutUser = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  AsyncStorage.clear();
  dispatch(logout());
  navigation.replace('authPage');
};

function useCheckUser(response, onLogout) {
  if (response.status === 401) {
    if (onLogout) {
      onLogout();
    }
    return true;
  } else {
    return false;
  }
}
