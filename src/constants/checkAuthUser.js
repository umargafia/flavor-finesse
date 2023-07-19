import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
export const useLogoutUser = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  AsyncStorage.clear();
  dispatch(logout());
  navigation.replace('authPage');
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
