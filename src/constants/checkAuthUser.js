import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
export const useLogoutUser = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  AsyncStorage.clear();
  dispatch(logout());
  navigation.replace('authPage');
  return;
};

export function useCheckUser(response, onLogout) {
  if (response.status === 401) {
    if (onLogout) {
      onLogout();
    }
    return true;
  } else {
    return false;
  }
}
